const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    picture: String,
    status: String,
    tel1: String,
    tel2: String,
    tel3: String,
    tel4: String,
    tel5: String,
    companyId: String,
  },
  { timestamps: true }
);
const Contact = mongoose.model("contacts", schema);
module.exports = Contact;
