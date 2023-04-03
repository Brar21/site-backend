const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU" },
  },
  { timestamps: true }
);


const User= mongoose.model("User", UserSchema);
module.exports={User}