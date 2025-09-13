# Requires "requests" to be installed (see https://pypi.org/project/requests/)
import requests
import os

def remove_background_pixian(image_path, output_path='pixian_result.png'):
    """
    Remove background using Pixian.ai API
    """
    # Check if image file exists
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found")
        return False
    
    try:
        # Pixian.ai API call
        response = requests.post(
            'https://api.pixian.ai/api/v2/remove-background',
            files={'image': open(image_path, 'rb')},
            data={
                'format': 'PNG',
                'quality': 'high',
                'test': 'true'  # This enables test mode (free)
            },
            auth=('pxhkyis8zj8cysa', 'qnuag772k0brml0dj8lfv469a38sthmtq7e4vses7v035kccpc54')
        )
        
        if response.status_code == requests.codes.ok:
            # Save result
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
    # Test with a sample image
    test_image = "sample_image.jpg"  # Change this to your image file
    
    if not os.path.exists(test_image):
        print(f"❌ Please create a test image named '{test_image}' or change the filename in the code")
        print("You can create one with: python -c \"from PIL import Image, ImageDraw; img = Image.new('RGB', (300, 400), 'lightblue'); draw = ImageDraw.Draw(img); draw.rectangle([100, 150, 200, 350], fill='red'); img.save('sample_image.jpg')\"")
    else:
        print(f"🔄 Processing image: {test_image}")
        success = remove_background_pixian(test_image)
        if success:
            print("🎉 Done!")
        else:
            print("💥 Failed to remove background")