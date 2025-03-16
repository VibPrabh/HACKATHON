import pandas as pd
from glob import glob
import os
from tqdm import tqdm
import csv
import shutil
from sklearn.model_selection import train_test_split
from PIL import Image, ImageOps

# for image_name in tqdm(glob("./test_images/*.png")):
#     if "healthy" in image_name:
#         shutil.move(image_name, "./test_images/healthy")
#     else:
#         shutil.move(image_name, "./test_images/patients")

# for image_name in tqdm(glob("./train_images/*.png")):
#     if "healthy" in image_name:
#         shutil.move(image_name, "./train_images/healthy")
#     else:
#         shutil.move(image_name, "./train_images/patients")

# df = pd.read_csv("./all_pahaw.csv")
# train_df, test_df = train_test_split(df, test_size=0.2)

# train_df.to_csv("./pahaw_train.csv", index=False)
# test_df.to_csv("./pahaw_test.csv", index=False)

# # filtered_df = df[df["image_name"].str.contains("PaHaW", na=False, case=False)]

# # filtered_df.to_csv("./all_pahaw.csv")

# # Function to copy images
# def copy_images(df, destination_folder):
#     for _, row in df.iterrows():
#         img_path = "../datasets/" + row["image_name"]  # Adjust if your column name is different
#         cls = row["MDS_UPDRS"] if row["MDS_UPDRS"] > -1 else "healthy"
#         if os.path.exists(img_path):
#             shutil.copy(img_path, "../datasets/PaHaW/" + destination_folder+f"/{cls}")

# # Copy images
# copy_images(train_df, "train")
# copy_images(test_df, "test")


def rotate_and_save(img, path, row, all_data_df):
    angles = [90, 180, 270]
    for a in angles:
        rotated = img.rotate(a)
        rotated.save(path + f"_rot{a}.png")
        new_row = pd.DataFrame([{"image_id": f"{row['image_id']}_rot{a}", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_rot{a}.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"], "MDS_UPDRS": row["MDS_UPDRS"]}])
        all_data_df = pd.concat([all_data_df, new_row], ignore_index=True)

    return all_data_df

def flip_and_save(img, path, row, all_data_df):
    flipped_h = ImageOps.mirror(img)
    flipped_v = ImageOps.flip(img)

    flipped_h.save(path + f"_flipH.png")
    flipped_v.save(path + f"_flipV.png")
    new_row_h = pd.DataFrame([{"image_id": f"{row['image_id']}_flipH", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_flipH.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"], "MDS_UPDRS": row["MDS_UPDRS"]}])
    new_row_v = pd.DataFrame([{"image_id": f"{row['image_id']}_flipV", "source": row["source"], "source_type": row["source_type"], "image_name": path + f"_flipV.png", "old_image_size": row["old_image_size"], "new_image_size": row["new_image_size"], "classification": row["classification"], "MDS_UPDRS": row["MDS_UPDRS"]}])
    all_data_df = pd.concat([all_data_df, new_row_h, new_row_v], ignore_index=True)

    return all_data_df


df = pd.read_csv("pahaw_test.csv")

for index, row in df.iterrows():
    name = row["image_name"].split("/")[-1].split(".")[0]
    cls = row["MDS_UPDRS"] if row["MDS_UPDRS"] > -1 else "healthy"
    path = "../datasets/PaHaw/test/" + str(cls) + "/" + name
    img = Image.open("../datasets/" + row["image_name"])
    df = rotate_and_save(img, path, row, df)
    df = flip_and_save(img, path, row, df)

df = pd.read_csv("pahaw_train.csv")

for index, row in df.iterrows():
    name = row["image_name"].split("/")[-1].split(".")[0]
    cls = row["MDS_UPDRS"] if row["MDS_UPDRS"] > -1 else "healthy"
    path = "../datasets/PaHaw/train/" + str(cls) + "/" + name
    img = Image.open("../datasets/" + row["image_name"])
    df = rotate_and_save(img, path, row, df)
    df = flip_and_save(img, path, row, df)