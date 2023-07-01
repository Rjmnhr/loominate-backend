const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    cat: {
      type: String,
    },
    hashtags: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
