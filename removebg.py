# pixian.py
# Requires: pip install requests Pillow python-dotenv
import requests
import os
import sys
from PIL import Image
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv("REMOVE_BG_API_KEY")

if not API_KEY:
    print("Error: REMOVE_BG_API_KEY not set in .env")
    sys.exit(1)

def remove_background_removebg(image_path, output_path, api_key):
    """
    Remove background using remove.bg API
    """
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found")
        return False

    try:
        with open(image_path, 'rb') as f:
            response = requests.post(
                'https://api.remove.bg/v1.0/removebg',
                files={'image_file': f},
                data={'size': 'auto'},
                headers={'X-Api-Key': api_key},
            )

        if response.status_code == requests.codes.ok:
            with open(output_path, 'wb') as out:
                out.write(response.content)
            print(f"Background removed successfully! Saved to: {output_path}")
            return True
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return False

    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return False

def remove_transparent_pixels(image_path, output_path):
    """
    Crop out fully transparent pixels
    """
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found")
        return False

    img = Image.open(image_path).convert("RGBA")
    _, _, _, alpha = img.split()
    bbox = alpha.getbbox()

    if bbox:
        cropped_img = img.crop(bbox)
        cropped_img.save(output_path)
        print(f"Cropped transparent pixels! Saved to: {output_path}")
        return True
    else:
        print("Image is fully transparent!")
        return False

from PIL import Image

def extend_to_3_4(image_path, output_path):
    """
    Extend image to 3:4 aspect ratio with transparent background
    (portrait orientation: 3 wide, 4 tall)
    """
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    # Assume height stays the same, compute width for 3:4
    target_height = height
    target_width = int(height * 3 / 4)

    # If width is bigger than target, fix width and adjust height
    if target_width < width:
        target_width = width
        target_height = int(width * 4 / 3)

    # Transparent background canvas
    new_img = Image.new("RGBA", (target_width, target_height), (0, 0, 0, 0))

    # Center the original image
    x_offset = (target_width - width) // 2
    y_offset = (target_height - height) // 2
    new_img.paste(img, (x_offset, y_offset), img)

    new_img.save(output_path)
    print(f"Extended to 3:4! Saved to: {output_path}")

    return True


if __name__ == "__main__":
    # Check command line arguments
    if len(sys.argv) >= 3:
        input_path = sys.argv[1]
        output_path = sys.argv[2]

        print(f"Processing image: {input_path}")

        # Step 1: Remove background
        bg_removed = remove_background_removebg(input_path, output_path, API_KEY)

        if bg_removed:
            # Step 2: Crop transparent pixels
            remove_transparent_pixels(output_path, output_path)

            # Step 3: Extend to 4:3 aspect ratio
            extend_to_3_4(output_path, output_path)

            print("Done!")
            sys.exit(0)
        else:
            print("Failed to remove background")
            sys.exit(1)
    else:
        # Default test
        test_image = "sample.png"
        output_image = "sample_out.png"

        if not os.path.exists(test_image):
            print(f"Please create a test image named '{test_image}'")
        else:
            print(f"Processing image: {test_image}")
            bg_removed = remove_background_removebg(test_image, output_image, API_KEY)
            if bg_removed:
                remove_transparent_pixels(output_image, output_image)
                extend_to_3_4(output_image, output_image)
                print("Done!")
            else:
                print("Failed to remove background")
