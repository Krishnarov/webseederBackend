import User from "../Models/User_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//         + signup logic +
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, usertype } = req.body;
    if (!fullname || !email || !password || !usertype) {
      return res.status(400).json({ message: "something is missing" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(404).json({ message: "user already exists" });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
      fullname,
      email,
      password: hasPassword,
      usertype,
    });
    await createUser.save();
    res.status(200).json({
      message: "user created successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "intern server error", error });
  }
};

//         + login logic +

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid email or password" });
    if (user.currentToken) {
      user.currentToken = null;
      await user.save();
      return res
        .status(403)
        .json({ message: "User already logged in elsewhere" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    user.currentToken = token;
    await user.save();

    return res
      .cookie("token", token, {
        httpOnly: true,
        // sameSite: "None",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: `welcome back ${user.fullname}! `, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

//         + logOut logic +

export const LogOut = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log("user", user);
    user.currentToken = null;
    await user.save();

    res.clearCookie("token").json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};