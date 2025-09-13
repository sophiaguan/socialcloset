import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"; // For Node.js, local file

dotenv.config();

const s3 = new S3Client({
    region: "us-east-1",
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

// Example usage
uploadImage("./output_ai_image.jpg", "tops", "shirt1.jpg");
