const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/send-otp", (req, res) => {
  const { email } = req.body;

  // Generate OTP (e.g., using a random number generator library)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "rjmnhr9551@gmail.com",
      pass: "kkrmsdqpdusjmwbs",
    },
  });

  // Set up email data
  const mailOptions = {
    from: "rjmnhr9551@gmail.com",
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    } else {
      res.status(200).json(otp);
    }
  });
});

module.exports = router;
