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

    // Call Pixian.ai API directly
    const form = new FormData();
    form.append('image', fs.createReadStream(tempFilePath));
    form.append('format', 'PNG');
    form.append('quality', 'high');
    form.append('test', 'true');

    console.log("Calling Pixian.ai API with test mode enabled...");
    console.log("Form data fields:", {
      format: 'PNG',
      quality: 'high', 
      test: 'true'
    });
    
    const response = await fetch('https://api.pixian.ai/api/v2/remove-background', {
      method: 'POST',
      body: form,
      headers: {
        'Authorization': 'Basic ' + Buffer.from('pxhkyis8zj8cysa:qnuag772k0brml0dj8lfv469a38sthmtq7e4vses7v035kccpc54').toString('base64')
      }
    });

    console.log("Pixian API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pixian API error response:", errorText);
      throw new Error(`Pixian API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Save the processed image
    const processedImageBuffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(processedImageBuffer));

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
