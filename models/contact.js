const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Contactform = mongoose.model("Feedback", ContactSchema);
module.exports = { Contactform };
