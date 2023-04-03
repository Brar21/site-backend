const mongoose = require("mongoose");
const ForgotPasswordSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
},{timestamps: true});

export default mongoose.model.User||mongoose.model("ForgotPassword",ForgotPasswordSchema);
