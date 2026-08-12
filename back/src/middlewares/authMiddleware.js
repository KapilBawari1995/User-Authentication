import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ================= TOKEN CHECK =================

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied! No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // ================= VERIFY TOKEN =================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ================= USER ID =================

    const userId = decoded.id || decoded._id || decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token user information.",
      });
    }

    // ================= GET USER =================

    const user = await User.findById(userId)
      .populate("role", "name permissions");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // ================= ACTIVE USER =================

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive.",
      });
    }

    // ================= REQUEST USER =================

    req.user = user;

    next();

  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);

    return res.status(403).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};

export default verifyToken;