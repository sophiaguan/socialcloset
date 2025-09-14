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
const Group = require("./models/group");

const { uploadItem } = require("./upload");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { timeStamp } = require("console");

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

// Get user's clothing items
// router.get("/user-clothes", auth.ensureLoggedIn, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Combine tops and bottoms into a single array
//     const allClothes = [...(user.tops || []), ...(user.bottoms || []), ...(user.heads || [])];

//     res.json({ clothes: allClothes });
//   } catch (error) {
//     console.error("Error fetching user clothes:", error);
//     res.status(500).json({ error: "Failed to fetch user clothes" });
//   }
// });

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
  const group = new Group({
    name: req.body.name,
    code: groupId,
    users: [req.user.googleid],
    heads: [],
    tops: [],
    bottoms: [],
    shoes: [],
    outfits: [],
  });
  await group.save();
  res.json({ groupId });
});

// Join group by code
router.post('/joingroup', auth.ensureLoggedIn, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string' || code.length !== 4) {
      return res.status(400).json({ error: "Invalid group code. Must be exactly 4 characters." });
    }

    // Convert to uppercase and find group
    const groupCode = code.toUpperCase();
    const group = await Group.findOne({ code: groupCode });

    if (!group) {
      return res.status(404).json({ error: "Group not found with this code." });
    }

    // Check if user is already in the group
    if (group.users.includes(req.user.googleid)) {
      return res.status(400).json({ error: "You are already a member of this group." });
    }

    // Add user to the group
    group.users.push(req.user.googleid);
    await group.save();

    res.json({
      success: true,
      message: "Successfully joined the group!",
      groupName: group.name
    });

  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ error: "Failed to join group" });
  }
});

// Get all groups that the user is part of
router.get('/usergroups', auth.ensureLoggedIn, async (req, res) => {
  try {
    // Find all groups where the user is a member
    const groups = await Group.find({ users: req.user.googleid });

    // For each group, get user details for all members
    const groupsWithMembers = await Promise.all(
      groups.map(async (group) => {
        const memberUsers = await User.find({ googleid: { $in: group.users } });
        return {
          id: group._id,
          name: group.name,
          code: group.code,
          members: memberUsers.map(user => ({
            name: user.name,
            googleid: user.googleid
          }))
        };
      })
    );

    res.json({ groups: groupsWithMembers });
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// Edit group name
router.post('/editgroupname', auth.ensureLoggedIn, async (req, res) => {
  try {
    const { groupId, newName } = req.body;

    if (!groupId || !newName || !newName.trim()) {
      return res.status(400).json({ error: "Group ID and new name are required" });
    }

    // Find the group and check if user is a member
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (!group.users.includes(req.user.googleid)) {
      return res.status(403).json({ error: "You are not a member of this group" });
    }

    // Update the group name
    group.name = newName.trim();
    await group.save();

    res.json({
      success: true,
      message: "Group name updated successfully",
      newName: group.name
    });

  } catch (error) {
    console.error("Error updating group name:", error);
    res.status(500).json({ error: "Failed to update group name" });
  }
});

// Get shared items for a user in a group
router.get("/shared-items/:groupCode/:userId", async (req, res) => {
  const { groupCode, userId } = req.params;

  try {
    const group = await Group.findOne({ code: groupCode });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Filter items for the user based on filename prefix
    const filterByUser = (items) => items.filter(item => item.startsWith(`${userId}_`));

    // const sharedItems = {
    //   heads: filterByUser(group.heads),
    //   tops: filterByUser(group.tops),
    //   bottoms: filterByUser(group.bottoms),
    //   shoes: filterByUser(group.shoes),
    // };
    const sharedItems = [
      ...filterByUser(group.heads),
      ...filterByUser(group.tops),
      ...filterByUser(group.bottoms),
      ...filterByUser(group.shoes)
    ];

    res.json({ sharedItems });
  } catch (err) {
      console.error("Error fetching shared items:", err);
      res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-items/:groupCode", async (req, res) => {
    const { groupCode } = req.params;
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items)) {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        const group = await Group.findOne({ code: groupCode });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        for (const item of items) {
          const filename = item.split("/").pop(); // e.g., "googleid_top_1699999999999.png"
          const parts = filename.split("_");
          if (parts.length < 3) continue; // sanity check
          const type = parts[1];
          if (group[type]) {
              group[type].push(item);
          } else {
              console.warn(`Unknown clothing type: ${type}`);
          }
        }

        await group.save();

        res.status(200).json({ message: "Items shared successfully" });
    } catch (error) {
        console.error("Error adding items to group closet:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/upload-clothing", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    if (!req.user) {
      return res.status(401).send('You are not logged in!');
    }

    const { clothingType } = req.body;
    const tempFilePath = req.file.path;

    // const closetSize = await User.updateOne(
    //   { googleid: req.user.googleid },
    //   { $inc: { closetSize: 1 } }
    // );
    // console.log(req.user.closetSize)

    // Generate filename with timestamp
    const tempDir = "temp/";
    const timestamp = Date.now();
    const outputPath = `${tempDir}image_${req.user.googleid}_${timestamp}.png`;
    // ^ will need to change if we implement delete clohtes function

    console.log("Processing image:", tempFilePath);
    console.log("Clothing details:", { clothingType });

    // Call Python script directly (more reliable than replicating API call)
    const { spawn } = require('child_process');

    console.log("Calling Python script to process image...");
    console.log("Input file:", tempFilePath);
    console.log("Output file:", outputPath);

    // Call the Python script with the temp file (using conda Python)
    const pythonProcess = spawn('python', [
      path.join(__dirname, '..', 'removebg.py'),
      tempFilePath,
      outputPath
    ]);

    // Wait for Python script to complete
    await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log("Python script completed successfully");
          resolve();
        } else {
          console.error(`Python script failed with code ${code}`);
          reject(new Error(`Python script failed with exit code ${code}`));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error("Error running Python script:", error);
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

    console.log("Image processed successfully:", outputPath);

    try {
      const s3Url = await uploadItem(outputPath, clothingType, `${req.user.googleid}_${clothingType}_${timestamp}.png`);
      console.log("Image uploaded to S3:", s3Url);
      await User.updateOne({ googleid: req.user.googleid }, {
        $push: { [clothingType]: s3Url }
      });
    } catch (err) {
      console.error("Error uploading to S3:", err);
      if (err.stack) console.error(err.stack);
      res.status(500).json({ success: false, error: "S3 upload failed", details: err.message });
      return;
    }
    fs.unlinkSync(outputPath);

    res.json({
      success: true
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

// Get all clothing image URLs for the logged-in user
router.get("/clothing-images", auth.ensureLoggedIn, async (req, res) => {
  try {
    const user = await User.findOne({ googleid: req.user.googleid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Collect clothing image URLs
    const images = {
      tops: user.tops || [],
      bottoms: user.bottoms || [],
      heads: user.heads || [],
      shoes: user.shoes || []
    };
    console.log(images)

    res.json( images );
  } catch (error) {
      console.error("Error retrieving clothing images:", error);
      res.status(500).json({ error: "Failed to retrieve clothing images" });
  }
});

// router.get("/shared-clothing-images", auth.ensureLoggedIn, async (req, res) => {
//   try {
//     const user = await User.findOne({ googleid: req.user.googleid });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const cleanImageUrls = (urls) => {
//       return urls.map(url => {
//         const underscoreIndex = url.lastIndexOf("_");
//         if (underscoreIndex === -1) return url;
//         return url.substring(0, underscoreIndex) + ".png";
//       });
//     };

//     const images = {
//       tops: cleanImageUrls(user.tops || []),
//       bottoms: cleanImageUrls(user.bottoms || []),
//       heads: cleanImageUrls(user.heads || []),
//       shoes: cleanImageUrls(user.shoes || [])
//     };
//     console.log(images)

//     res.json( images );
//   } catch (error) {
//       console.error("Error retrieving clothing images:", error);
//       res.status(500).json({ error: "Failed to retrieve clothing images" });
//   }
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
