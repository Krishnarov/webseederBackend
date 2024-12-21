import User from "../Models/User_model.js";

import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ messeage: "invalied token", token: token });
    }
    const user = await User.findById(decoded.userId);
    if (user.currentToken !== token) {
      return res.status(403).json({ message: "user logged out " });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({ messeage: "internat server error", error });
  }
};
