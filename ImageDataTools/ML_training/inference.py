import torch
from ultralytics import YOLO
import os
import numpy as np
import pandas as pd
import joblib
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score, average_precision_score


# file_path = "./model/PaHaWBest.pt"

## this model only does severity 
# file_path = "/Users/nicholask/Desktop/HACKATHON/ImageDataTools/ML_training/runs/classify/severeClassifier/weights/best.pt"

## this model does all
file_path = "/Users/nicholask/Desktop/HACKATHON/ImageDataTools/ML_training/model/PaHaWBest.pt" ### 0.895 accuracy

model = YOLO(file_path)

metrics = model.val(save_json=True)