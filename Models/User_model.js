import mongoose from "mongoose";

const userSchama = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    currentToken: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchama);

export default User;
