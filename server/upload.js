import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// allow __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// point dotenv to project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";


const s3 = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

async function uploadImage(filePath, clothingType, fileName) {
  // filePath: local path from AI pipeline output
  // clothingType: "tops", "bottoms", "dresses"
  // fileName: "shirt1.jpg", etc.

  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: "socialcloset",
    Key: `${clothingType}/${fileName}`, // subfolder based on type
    Body: fileStream,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    console.log("Upload success:", data);
    return `https://socialcloset.s3.amazonaws.com/${clothingType}/${fileName}`;
  } catch (err) {
    console.error("Upload error:", err);
  }
}

async function uploadAllFromTemp() {
  const tempDir = "./temp/";
  
  try {
    // Read all files in temp directory
    const files = fs.readdirSync(tempDir);
    
    // Filter for image files (image1.png, image2.png, etc.)
    const imageFiles = files.filter(file => file.startsWith('image') && file.endsWith('.png'));
    
    console.log(`Found ${imageFiles.length} images to upload:`, imageFiles);
    
    for (const imageFile of imageFiles) {
      const imagePath = path.join(tempDir, imageFile);
      const metadataFile = imageFile.replace('.png', '_metadata.json');
      const metadataPath = path.join(tempDir, metadataFile);
      
      // Read metadata to get clothing type and name
      let clothingType = "unknown";
      let clothingName = "unknown";
      
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        clothingType = metadata.type || "unknown";
        clothingName = metadata.name || "unknown";
        console.log(`Processing ${imageFile}: ${clothingName} (${clothingType})`);
      } else {
        console.log(`No metadata found for ${imageFile}, using defaults`);
      }
      
      // Upload to S3
      const s3Url = await uploadImage(imagePath, clothingType, imageFile);
      
      if (s3Url) {
        console.log(`✅ Uploaded ${imageFile} to: ${s3Url}`);
        
        // Update metadata with S3 URL
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          metadata.s3Url = s3Url;
          metadata.uploadedAt = new Date().toISOString();
          fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
          console.log(`📝 Updated metadata for ${imageFile}`);
        }
      }
    }
    
    console.log("🎉 All images uploaded successfully!");
    
  } catch (error) {
    console.error("Error uploading images:", error);
  }
}

// Upload all images from temp folder
uploadAllFromTemp();
