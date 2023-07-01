const router = require("express").Router();
const Content = require("../models/content-modal");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsw1ubwyh",
  api_key: "828222755219982",
  api_secret: "MolGuQIrdoVwSH6cTgQdmPt0bak",
});

const upload = multer({ dest: "/uploads" });

router.post("/post", upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const content = new Content({
      title: req.body.title,
      desc: req.body.desc,
      cat: req.body.cat,
      hashtags: req.body.hashtags,
      image: result.secure_url,
    });
    const savedContent = await content.save();
    res.send(savedContent);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await Content.find({});
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

// router.get("/article/:id", async (req, res) => {
//   try {
//     const data = await Content.findById(req.params.id);
//     res.status(200).send(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     await Content.findByIdAndDelete(req.params.id);
//     res.status(200).json("content has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
