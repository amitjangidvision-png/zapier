const mongoose = require("mongoose");


const amazonMailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Subject is requierd"],
  },
  body: {
    type: String,
    required: [true, "body is required"],
  }
});

module.exports = mongoose.model("AmazonMail", amazonMailSchema);