import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms, datasets
from torch.utils.data import DataLoader
from sklearn.metrics import precision_score, recall_score, f1_score
import os

# ===== CONFIG =====
DATA_DIR = "/Users/nicholask/Desktop/HACKATHON/datasets/PaHaW"  # Replace with your dataset path
BATCH_SIZE = 8
NUM_CLASSES = 6  # Change this based on MDS-UPDRS severity levels
EPOCHS = 15
LEARNING_RATE = 1e-4
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_DIR = './model'  # Directory to save the model

# Create the model directory if it doesn't exist
os.makedirs(MODEL_DIR, exist_ok=True)

# ===== DATA AUGMENTATION & LOADING =====
train_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomRotation(10),
    transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

test_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

train_dataset = datasets.ImageFolder(root=f"{DATA_DIR}/train", transform=train_transforms)
test_dataset = datasets.ImageFolder(root=f"{DATA_DIR}/test", transform=test_transforms)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False)

# ===== LOAD PRETRAINED RESNET & MODIFY IT =====
model = models.resnet18(pretrained=True)  # You can use resnet50 for a larger model

# Freeze early layers
for param in model.parameters():
    param.requires_grad = False

# Replace last layer for classification
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, NUM_CLASSES)  # Modify for your number of classes
model = model.to(DEVICE)

# ===== LOSS & OPTIMIZER =====
criterion = nn.CrossEntropyLoss()  # Use MSELoss() if doing regression instead
optimizer = optim.Adam(model.fc.parameters(), lr=LEARNING_RATE)

# ===== TRAINING FUNCTION =====
def train_model(model, train_loader, test_loader, criterion, optimizer, epochs):
    for epoch in range(epochs):
        model.train()
        running_loss, correct, total = 0.0, 0, 0
        all_preds, all_labels = [], []  # Store predictions and true labels

        for images, labels in train_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = outputs.max(1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)

            all_preds.extend(predicted.cpu().numpy())  # Store predictions
            all_labels.extend(labels.cpu().numpy())  # Store true labels

        train_acc = correct / total
        precision = precision_score(all_labels, all_preds, average='weighted')
        recall = recall_score(all_labels, all_preds, average='weighted')
        f1 = f1_score(all_labels, all_preds, average='weighted')

        print(f"Epoch {epoch+1}/{epochs}, Loss: {running_loss/len(train_loader):.4f}, Accuracy: {train_acc:.4f}")
        print(f"Train Precision: {precision:.4f}, Recall: {recall:.4f}, F1 Score: {f1:.4f}")

        # Evaluate on test set
        test_model(model, test_loader, criterion)

        # Save model after every epoch
        save_model(model, epoch+1)

# ===== TEST FUNCTION =====
def test_model(model, test_loader, criterion):
    model.eval()
    correct, total, test_loss = 0, 0, 0.0
    all_preds, all_labels = [], []  # Store predictions and true labels

    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            outputs = model(images)
            loss = criterion(outputs, labels)
            test_loss += loss.item()

            _, predicted = outputs.max(1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)

            all_preds.extend(predicted.cpu().numpy())  # Store predictions
            all_labels.extend(labels.cpu().numpy())  # Store true labels

    test_acc = correct / total
    precision = precision_score(all_labels, all_preds, average='weighted')
    recall = recall_score(all_labels, all_preds, average='weighted')
    f1 = f1_score(all_labels, all_preds, average='weighted')

    print(f"Test Loss: {test_loss/len(test_loader):.4f}, Test Accuracy: {test_acc:.4f}")
    print(f"Test Precision: {precision:.4f}, Recall: {recall:.4f}, F1 Score: {f1:.4f}\n")

# ===== SAVE MODEL FUNCTION =====
def save_model(model, epoch):
    save_path = os.path.join(MODEL_DIR, f'model_epoch_{epoch}.pth')
    torch.save(model.state_dict(), save_path)
    print(f"Model saved to {save_path}")

# ===== TRAIN THE MODEL =====
train_model(model, train_loader, test_loader, criterion, optimizer, EPOCHS)
