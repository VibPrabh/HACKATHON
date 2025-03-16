from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from werkzeug.utils import secure_filename
from PIL import Image
from io import BytesIO
from ultralytics import YOLO
import time

import openai

index_map = {
    0:"MDS UPDRS 1",
    1:"MDS UPDRS 2",
    2:"MDS UPDRS 3",
    3:"MDS UPDRS 4",
    4:"MDS UPDRS 4",
    5:"Healthy",
}

secret = None
with open("./secret/secret.txt", "r") as f:
    line = f.readline()
    secret = line
User_data = None
with open("../src/components/common/data.json", "r") as f:
    User_data = f.read()

openai.api_key=secret

system_prompt = f"""You are a helpful and friendly assistant in charge of providing patients with simplified and clear summaries of their health data provided below. You are provided with the user's health data, so they will ask you questions regarding their own health data. Please use the following data to help answer any questions the user may have. Also, easy to understand responses that are still informative.

Health Data:
{User_data}
"""
messages = [
    {"role": "system", "content": system_prompt}
  ]

file_path = "/Users/nicholask/Desktop/HACKATHON/ImageDataTools/ML_training/model/PaHaWBest.pt" ### 0.895 accuracy
model = YOLO(file_path)

# Initialize Flask app and enable CORS for front-end communication
app = Flask(__name__)
CORS(app)

# Set the upload folder for saving the images
UPLOAD_FOLDER = '/Users/nicholask/Desktop/HACKATHON/react-admin-dashboard/images/uploaded_by_user'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Check if the file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to save base64 image to a file
def save_base64_image(base64_str, filename):
    # Convert base64 to image
    img_data = base64.b64decode(base64_str.split(",")[1])  # Removing the prefix
    img = Image.open(BytesIO(img_data))
    
    # Ensure image is in PNG format and save it
    img = img.convert("RGBA")  # Convert to RGBA if necessary
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img.save(save_path, format="PNG")
    return save_path

# Endpoint to handle drawing image uploads
@app.route('/upload_drawing', methods=['POST'])
def upload_drawing():
    print("DRAWING INITIATED")
    try:
        # Get the base64 image data from the request body
        data = request.get_json()
        base64_image = data.get('image')

        if not base64_image:
            return jsonify({"error": "No image data provided"}), 400

        # Generate a secure filename
        filename = "drawing_" + str(int(time.time())) + ".png"
        
        # Save the image using the helper function
        save_path = save_base64_image(base64_image, filename)
        print(save_path)
        print("saved")

        results = model(save_path)

        probs = results[0].probs  # Probs object for classification outputs

        result = {
            "classification": index_map[probs.top1],
            "confidence": probs.top1conf
        }

        print(result)
        
        print("returning")
        score = probs.top1
        if score == 5:
            score = 4
        return jsonify({"message": "Image uploaded successfully", "path": save_path, "classification": str(score), "confidence": str(probs.top1conf.item())}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    payload = {"role": "user", "content": user_message}
    messages.append(payload)
    completion = openai.ChatCompletion.create(
        model="gpt-4o",
        messages= messages)



    bot_response = completion.choices[0].message.content

    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
