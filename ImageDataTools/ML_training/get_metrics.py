from ultralytics import YOLO

model = YOLO("yolo11n-cls.pt")

results = model.train(data = '/content/PaHaW', epochs=300, patience=50, cls=3.0, batch=8, lr0=0.003, lrf = 0.2, cos_lr = True, rect=True, multi_scale=True, amp=True)

import numpy as np
from sklearn.metrics import precision_score, recall_score, f1_score
from glob import glob

counts = {
    "TP": 0, "FP": 0, "FN": 0, "TN": 0
}

for i in range(1,6):

  for image in glob(f"/content/PaHaW/train/{i}/*"):
    prediction = model(image)
    classification = prediction[0].probs.top1

    if classification != "healthy": 
      counts["TP"] += 1
    else:
      counts["FN"] += 1


for image in glob(f"/content/PaHaW/train/healthy/*"):
    prediction = model(image)
    classification = prediction[0].probs.top1

    if classification == "healthy": 
      counts["TN"] += 1
    else:
      counts["FP"] += 1
  
print(counts)