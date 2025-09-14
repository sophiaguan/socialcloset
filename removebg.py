
# pixian.py
# Requires: pip install requests
import requests
import os
import sys

API_KEY = "QcUoJnhvRRgfjBCzhpQnnJjA"  # hardcoded for testing

def remove_background_removebg(image_path, output_path, api_key):
    """
    Remove background using remove.bg API
    """
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file '{image_path}' not found")
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
            print(f"✅ Background removed successfully! Saved to: {output_path}")
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

    except Exception as e:
        print(f"❌ Error processing image: {str(e)}")
        return False

if __name__ == "__main__":
    # Check command line arguments
    if len(sys.argv) >= 3:
        input_path = sys.argv[1]
        output_path = sys.argv[2]
        print(f"🔄 Processing image: {input_path}")
        success = remove_background_removebg(input_path, output_path, API_KEY)
        if success:
            print("🎉 Done!")
            sys.exit(0)
        else:
            print("💥 Failed to remove background")
            sys.exit(1)
    else:
        # Test with a sample image
        test_image = "sample.png"
        output_image = "sample_out.png"

        if not os.path.exists(test_image):
            print(f"❌ Please create a test image named '{test_image}'")
        else:
            print(f"🔄 Processing image: {test_image}")
            success = remove_background_removebg(test_image, output_image, API_KEY)
            if success:
                print("🎉 Done!")
            else:
                print("💥 Failed to remove background")
# # pixian.py
# # Requires: pip install requests
# import requests
# import os
# import sys

# def remove_background_removebg(image_path, output_path, api_key):
#     """
#     Remove background using remove.bg API
#     """
#     if not os.path.exists(image_path):
#         print(f"❌ Error: Image file '{image_path}' not found")
#         return False

#     try:
#         with open(image_path, 'rb') as f:
#             response = requests.post(
#                 'https://api.remove.bg/v1.0/removebg',
#                 files={'image_file': f},
#                 data={'size': 'auto'},
#                 headers={'X-Api-Key': "QcUoJnhvRRgfjBCzhpQnnJjA"},
#             )

#         if response.status_code == requests.codes.ok:
#             with open(output_path, 'wb') as out:
#                 out.write(response.content)
#             print(f"✅ Background removed successfully! Saved to: {output_path}")
#             return True
#         else:
#             print(f"❌ Error: {response.status_code} - {response.text}")
#             return False

#     except Exception as e:
#         print(f"❌ Error processing image: {str(e)}")
#         return False

# if __name__ == "__main__":
#     import sys
    
#     # Check if command line arguments are provided
#     if len(sys.argv) >= 2:
#         input_path = sys.argv[1]
#         output_path = sys.argv[2] if len(sys.argv) > 2 else 'pixian_result.png'
        
#         print(f"🔄 Processing image: {input_path}")
#         success = remove_background_removebg(input_path, output_path)
#         if success:
#             print("🎉 Done!")
#             sys.exit(0)
#         else:
#             print("💥 Failed to remove background")
#             sys.exit(1)
#     else:
#         # Test with a sample image
#         test_image = "sample.png"  # Change this to your image file
        
#         if not os.path.exists(test_image):
#             print(f"❌ Please create a test image named '{test_image}' or change the filename in the code")
#             print("You can create one with: python -c \"from PIL import Image, ImageDraw; img = Image.new('RGB', (300, 400), 'lightblue'); draw = ImageDraw.Draw(img); draw.rectangle([100, 150, 200, 350], fill='red'); img.save('sample_image.jpg')\"")
#         else:
#             print(f"🔄 Processing image: {test_image}")
#             success = remove_background_removebg(test_image)
#             if success:
#                 print("🎉 Done!")
#             else:
#                 print("💥 Failed to remove background")

# # if __name__ == "__main__":
    
# #     # Get command-line arguments
# #     if len(sys.argv) < 3:
# #         print("Usage: python pixian.py <input_path> <output_path>")
# #         sys.exit(1)

# #     input_path = sys.argv[1]
# #     output_path = sys.argv[2]

# #     # Get API key from environment variable
# #     api_key = "QcUoJnhvRRgfjBCzhpQnnJjA"

# #     print(f"🔄 Processing image: {input_path}")
# #     success = remove_background_removebg(input_path, output_path, api_key)

# #     if success:
# #         print("🎉 Done!")
# #         sys.exit(0)
# #     else:
# #         print("💥 Failed to remove background")
# #         sys.exit(1)
