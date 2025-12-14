import jwt from "jsonwebtoken";
import { config } from "../configs/config.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Not authorized, no refresh token" });
    }

    const decoded = jwt.verify(refreshToken, config.REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
    res.cookie("token", token, { httpOnly: true, secure: config.NODE_ENV === "production" });
    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    res.status(401).json({ message: "Not authorized, refresh token failed" });
  }
};