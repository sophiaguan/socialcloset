/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const generateCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
};

router.post('/creategroup', async (req, res) => {
  const groupId = generateCode();
  const group = new Group({ name: req.body.name, code: groupId, users: [req.user.googleid]});
  await group.save();
  res.json({ groupId });
});

// Upload clothing image and process it
router.post("/upload-clothing", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { imageName, clothingType } = req.body;
    const tempFilePath = req.file.path;
    const outputPath = `temp/processed_${Date.now()}.png`;

    console.log("Processing image:", tempFilePath);
    console.log("Clothing details:", { imageName, clothingType });

    // Call Python script directly (more reliable than replicating API call)
    const { spawn } = require('child_process');

    console.log("Calling Python script to process image...");
    console.log("Input file:", tempFilePath);
    console.log("Output file:", outputPath);

    // Call the Python script with the temp file (using conda Python)
    const pythonProcess = spawn('python', [
      path.join(__dirname, '..', 'pixian.py'),
      tempFilePath,
      outputPath
    ]);

    // Wait for Python script to complete
    await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log("✅ Python script completed successfully");
          resolve();
        } else {
          console.error(`❌ Python script failed with code ${code}`);
          reject(new Error(`Python script failed with exit code ${code}`));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error("❌ Error running Python script:", error);
        reject(error);
      });

      // Log Python output
      pythonProcess.stdout.on('data', (data) => {
        console.log("Python output:", data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error("Python error:", data.toString());
      });
    });

    // Check if the output file was created
    if (!fs.existsSync(outputPath)) {
      throw new Error("Python script did not create output file");
    }

    // Clean up temp files
    fs.unlinkSync(tempFilePath);

    console.log("✅ Image processed successfully:", outputPath);

    res.json({
      success: true,
      message: "Image processed successfully",
      originalImage: req.file.originalname,
      processedImage: path.basename(outputPath),
      clothingDetails: {
        name: imageName,
        type: clothingType
      }
    });

  } catch (error) {
    console.error("Error processing image:", error);
    console.error("Error stack:", error.stack);

    // Clean up temp file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      console.log("Cleaning up temp file:", req.file.path);
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Failed to process image",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
