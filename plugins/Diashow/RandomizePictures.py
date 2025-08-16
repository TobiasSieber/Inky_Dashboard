import os
import random




def GetNewPicture():
	# Path to your pictures folder
	pictures_folder = "/home/topi/Weather/plugins/Diashow/Pictures/Demo-Pictures"

	# Get a list of all files in the folder
	files = [f for f in os.listdir(pictures_folder) if os.path.isfile(os.path.join(pictures_folder, f))]

	# Filter only image files (optional)
	image_extensions = (".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp")
	images = [f for f in files if f.lower().endswith(image_extensions)]

	if not images:
   	 print("No images found in the folder.")
	else:
   	 # Pick a random image
   	 chosen_image = random.choice(images)
   	 print(chosen_image)
	 
   	 return chosen_image
