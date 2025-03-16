from glob import glob
from PIL import Image
from tqdm import tqdm
import numpy as np
import csv
import cv2


STANDARDIZED_SIZE = (256,256)
PROCESSED_IMAGE_BASEPATH = "../datasets/"
image_counter = {"healthy": 0, "patients": 0}

do_simple_dataset = True

with open("../datasets/metadata.csv", "w", newline="") as f:
    writer = csv.writer(f)
    headers = ["image_id", "source", "source_type", "image_name", "old_image_size", "new_image_size", "classification", "MDS_UPDRS"]
    writer.writerow(headers)

    if do_simple_dataset:
        ## NewHandPD First - images already included, just need to reshape to train the model
        for newhandpd_folder in glob("../datasets/raw/NewHandPD/*"):
            classification = None
            if "Healthy" in newhandpd_folder:
                print("Going through healthy at path: ", newhandpd_folder)
                classification = "healthy"
            else:
                print("Going through patients at path: ", newhandpd_folder)
                classification = "patients"

            for image_path in tqdm(glob(newhandpd_folder+"/*.jpg")):
                im = Image.open(image_path)
                width, height = im.size
                old_image_size = str((width, height))
                new_image = im.resize(STANDARDIZED_SIZE)
                new_image_size = str(new_image.size)

                new_image.save(PROCESSED_IMAGE_BASEPATH + classification + f"/{image_counter[classification]}_newHandPD_{classification}.png", 'PNG')

                row = [f"{classification[0]}_{str(image_counter[classification])}", "NewHandPD", "images", f"{classification}/{image_counter[classification]}_newHandPD_{classification}.png", old_image_size, new_image_size, classification, "-1"]
                image_counter[classification] += 1
                writer.writerow(row)

        ## Spiral_HandPD Next - everything is similar to NewHandPD
        for newhandpd_folder in glob("../datasets/raw/Spiral_HandPD/*"):
            classification = None
            if "Control" in newhandpd_folder:
                print("Going through healthy (Control) at path: ", newhandpd_folder)
                classification = "healthy"
            else:
                print("Going through patients at path: ", newhandpd_folder)
                classification = "patients"

            for image_path in tqdm(glob(newhandpd_folder+"/*.jpg")):
                im = Image.open(image_path)
                width, height = im.size
                old_image_size = str((width, height))
                new_image = im.resize(STANDARDIZED_SIZE)
                new_image_size = str(new_image.size)

                new_image.save(PROCESSED_IMAGE_BASEPATH + classification + f"/{image_counter[classification]}_spiralHandPD_{classification}.png", 'PNG')

                row = [str(image_counter[classification]), "SpiralHandPD", "images", f"{classification}/{image_counter[classification]}_spiralHandPD_{classification}.png", old_image_size, new_image_size, classification, "-1"]
                image_counter[classification] += 1
                writer.writerow(row)


        ## Kaggle dataset
        for split in ["testing", "training"]:
            for newhandpd_folder in glob(f"../datasets/raw/Kaggle_Parkinsons_Drawings/spiral/{split}/*"):
                classification = None
                if "healthy" in newhandpd_folder:
                    classification = "healthy"
                else:
                    classification = "patients"

                for image_path in tqdm(glob(newhandpd_folder + "/*.png")):
                    im = Image.open(image_path)
                    width, height = im.size
                    old_image_size = str((width, height))
                    new_image = im.resize(STANDARDIZED_SIZE)
                    new_image_size = str(new_image.size)

                    new_image.save(PROCESSED_IMAGE_BASEPATH + classification + f"/{image_counter[classification]}_Kaggle_{classification}.png")

                    row = [str(image_counter[classification]), "Kaggle", "images", f"{classification}/{image_counter[classification]}_Kaggle_{classification}.png", old_image_size, new_image_size, classification, "-1"]
                    image_counter[classification] += 1
                    writer.writerow(row)

    ## for the PaHaW_public dataset

    count = 0
    health_indexes = ['00026','00027','00028','00029','00030','00031','00032','00033','00034','00036','00039','00040','00041','00043','00044','00048','00049','00051','00052','00053','00054','00055','00057','00060','00061','00062','00066','00067','00069','00070','00071','00072','00073','00074','00075','00076','00077','00078','00080','00082','00083','00084','00085','00087','00089','00090','00091','00092','00094','00095','00096','00097']
    p_indexes = {
    "00001": 2,
    "00002": 2,
    "00003": 2,
    "00004": 2,
    "00005": 2,
    "00006": 2,
    "00007": 3,
    "00008": 1,
    "00009": 1,
    "00010": 2.5,
    "00013": 1,
    "00014": 3,
    "00015": 2.5,
    "00016": 2,
    "00017": 5,
    "00018": 2.5,
    "00019": 2,
    "00020": 2,
    "00022": 2,
    "00023": 2,
    "00024": 4,
    "00025": 3,
    "00033": 2,
    "00034": 2,
    "00036": 2,
    "00043": 1,
    "00044": 1,
    "00048": 4,
    "00053": 2,
    "00054": 2,
    "00055": 2.5,
    "00074": 2.5,
    "00075": 2.5,
    "00077": 3,
    "00078": 2,
    "00080": 3,
    "00098": 2
    }
    
    for person_path in glob("../datasets/raw/PaHaW_public/*"):
        classification = None
        person_idx = person_path.split("/")[-1]
        if person_idx in health_indexes:
            classification = "healthy"
        else:
            classification = "patients"

        ## There are 8 writing tests altogether, we only want the first, which is the spiral test
        for test_1 in glob(person_path +"/*1_1.svc"):
            f = open(test_1, "r")
            lines = f.readlines()
            num_samples = lines[0]
            data = lines[1:]

            def parse_data(data):
                parsed = []
                for line in data:
                    x, y, timestamp, button, azimuth, altitude, pressure = map(int, line.strip().split())
                    if button == 1:  # Only use pen-down (on-surface) points
                        parsed.append((x, y))
                return np.array(parsed)

            points = parse_data(data)

            # Normalize coordinates to 256x256
            min_x, max_x = points[:, 0].min(), points[:, 0].max()
            min_y, max_y = points[:, 1].min(), points[:, 1].max()
            points[:, 0] = ((points[:, 0] - min_x) / (max_x - min_x) * 255).astype(int)
            points[:, 1] = ((points[:, 1] - min_y) / (max_y - min_y) * 255).astype(int)

            # Create blank image
            image = np.ones((256, 256), dtype=np.uint8) * 255

            # Apply smoothing using interpolation
            smoothed_points = cv2.approxPolyDP(points.astype(np.float32), epsilon=2, closed=False).reshape(-1, 2)

            # Draw path with anti-aliased lines
            for i in range(len(smoothed_points) - 1):
                cv2.line(image, tuple(map(int, smoothed_points[i])), tuple(map(int, smoothed_points[i+1])), (0,), 1, lineType=cv2.LINE_AA)

            # Save image
            cv2.imwrite(PROCESSED_IMAGE_BASEPATH + classification + f"/{image_counter[classification]}_PaHaW_{classification}.png", image)

            severe = None
            if classification == "healthy":
                severe = "-1"
            else:
                severe = str(p_indexes[person_idx])

            row = [f"{classification[0]}_{str(image_counter[classification])}", "NewHandPD", "reconstruction", f"{classification}/{image_counter[classification]}_PaHaW_{classification}.png", "reconstructed", "(256,256)", classification, severe]
            image_counter[classification] += 1
            writer.writerow(row)
        # break ## lets just do one first
            
print(image_counter)