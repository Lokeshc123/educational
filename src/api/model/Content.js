const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
