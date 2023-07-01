const router = require("express").Router();
const User = require("../models/user-model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//signup
router.post("/signup", async (req, res) => {
  const userData = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    profilePic: req.body.profilePic,
  });

  try {
    const user = await userData.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/users", (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Wrong username or password");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong username or password");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accessToken });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
