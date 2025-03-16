import tkinter as tk
from PIL import Image, ImageDraw, ImageTk

# Create the main window
root = tk.Tk()
root.title("Draw with Mouse")

# Set up image size
width, height = 512, 512

# Create a white canvas using Pillow for the base image
image = Image.new("1", (width, height), color=1)  # "1" for 1-bit (black & white)
draw = ImageDraw.Draw(image)

# Load the template image (ensure template.png is in the same directory)
template = Image.open("spiral_template.png").convert("RGBA")  # Assuming the template is RGBA

# Resize the template image to fit the drawing canvas
template = template.resize((width, height), Image.Resampling.LANCZOS)

# Convert template image to something that can be displayed in Tkinter
template_tk = ImageTk.PhotoImage(template)

# Create a tkinter canvas to draw on, with white background
canvas = tk.Canvas(root, width=width, height=height, bg="white")
canvas.pack()

# Display the template as the background of the canvas
canvas.create_image(0, 0, anchor="nw", image=template_tk)

# Variable to track if the mouse is pressed
drawing = False
last_x, last_y = None, None

# Function to start drawing (on mouse press)
def start_draw(event):
    global drawing, last_x, last_y
    drawing = True
    last_x, last_y = event.x, event.y

# Function to continue drawing (on mouse drag)
def draw_line(event):
    global drawing, last_x, last_y
    if drawing:
        # Get the current mouse position
        current_x, current_y = event.x, event.y
        # Draw a smooth line from the previous point to the current point
        draw.line([last_x, last_y, current_x, current_y], fill=0, width=3)  # Larger width for smoother lines
        # Draw the line on the canvas
        canvas.create_line(last_x, last_y, current_x, current_y, fill="black", width=3)
        # Update last position for the next line segment
        last_x, last_y = current_x, current_y

# Function to stop drawing (on mouse release)
def stop_draw(event):
    global drawing
    drawing = False

# Function to save the image (without the template background)
def save_image():
    # Save the drawn image without the template background
    image.save("drawn_image.png")
    print("Image saved as 'drawn_image.png'")

# Function to clear the canvas
def clear_canvas():
    # Clear the canvas (remove all drawing elements)
    canvas.delete("all")
    # Reset the image and drawing object
    global image, draw, last_x, last_y
    image = Image.new("1", (width, height), color=1)  # Reset to white
    draw = ImageDraw.Draw(image)
    last_x, last_y = None, None  # Reset last_x, last_y
    # Re-add the template image
    canvas.create_image(0, 0, anchor="nw", image=template_tk)
    print("Canvas cleared")

# Bind mouse events
canvas.bind("<Button-1>", start_draw)  # Left click to start drawing
canvas.bind("<B1-Motion>", draw_line)  # Drag the mouse while holding left click to draw
canvas.bind("<ButtonRelease-1>", stop_draw)  # Release the button to stop drawing

# Add buttons for saving and clearing the image
save_button = tk.Button(root, text="Save Image", command=save_image)
save_button.pack()

clear_button = tk.Button(root, text="Clear Canvas", command=clear_canvas)
clear_button.pack()

# Start the Tkinter event loop
root.mainloop()
