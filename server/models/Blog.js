const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function () {
      return this.status === "published";
    },
  },
  content: {
    type: String,
    required: function () {
      return this.status === "published";
    },
  },
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

BlogSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Blog", BlogSchema);
