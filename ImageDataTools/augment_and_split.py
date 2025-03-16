import pandas as pd
from sklearn.model_selection import train_test_split
from PIL import Image, ImageOps
import csv

### augmentation has been done - uncomment if need to do again

# all_data_df = pd.read_csv("./metadata.csv")
# all_data_df = all_data_df.reset_index()

#     headers = ["image_id", "source", "source_type", "image_name", "old_image_size", "new_image_size", "classification"]

def rotate_and_save(img, path, row, all_data_df):
    angles = [90, 180, 270]
    for a in angles:
        rotated = img.rotate(a)
        rotated.save(path + f"_rot{a}.png")
        new_row = pd.DataFrame([{"image_id": f"{row['image_id']}_rot{a}", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_rot{a}.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"]}])
        all_data_df = pd.concat([all_data_df, new_row], ignore_index=True)

    return all_data_df

def flip(img, path, row, all_data_df):
    flipped_h = ImageOps.mirror(img)
    flipped_v = ImageOps.flip(img)

    flipped_h.save(path + f"_flipH.png")
    flipped_v.save(path + f"_flipV.png")
    new_row_h = pd.DataFrame([{"image_id": f"{row['image_id']}_flipH", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_flipH.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"]}])
    new_row_v = pd.DataFrame([{"image_id": f"{row['image_id']}_flipV", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_flipV.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"]}])
    all_data_df = pd.concat([all_data_df, new_row_h, new_row_v], ignore_index=True)

    return all_data_df

for index, row in all_data_df.iterrows():
    name = row["image_name"].split(".")[0]
    path = "../datasets/" + name
    img = Image.open("../datasets/" + row["image_name"])
    all_data_df = rotate_and_save(img, path, row, all_data_df)
    all_data_df = flip(img, path, row, all_data_df)

all_data_df.to_csv("Augmented_metadata.csv", index=False)


### split
# aug_df = pd.read_csv("./Augmented_metadata.csv")
# train_df, test_df = train_test_split(aug_df, test_size=0.2, random_state=42, stratify=aug_df['classification'] if 'classification' in aug_df.columns else None)
# train_df.to_csv("train_metadata.csv", index=False)
# test_df.to_csv("test_metadata.csv", index=False)

# import os
# import shutil

# # Create directories if they don’t exist
# os.makedirs("train_images", exist_ok=True)
# os.makedirs("test_images", exist_ok=True)

# def copy_images(df, destination_folder):
#     for _, row in df.iterrows():
#         img_path = "../datasets/" + row["image_name"]  # Adjust if your column name is different
#         if os.path.exists(img_path):
#             shutil.copy(img_path, os.path.join(destination_folder, os.path.basename(img_path)))
#         else:
#             print('error path not found: ', img_path)

# # Copy images
# copy_images(train_df, "train_images")
# copy_images(test_df, "test_images")