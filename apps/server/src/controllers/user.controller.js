import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../configs/config.js";

const parseExpiresIn = (expiresIn) => {
  const value = parseInt(expiresIn);
  if (expiresIn.includes("h")) {
    return value * 60 * 60 * 1000; // hours to milliseconds
  } else if (expiresIn.includes("d")) {
    return value * 24 * 60 * 60 * 1000; // days to milliseconds
  } else if (expiresIn.includes("m")) {
    return value * 60 * 1000; // minutes to milliseconds
  } else {
    return value * 1000; // seconds to milliseconds (default)
  }
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, config.REFRESH_SECRET, {
    expiresIn: config.REFRESH_EXPIRE,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Field are required" });
  }
  const AlreadyExits = await User.findOne({ $or: [{ email }, { name }] });
  if (AlreadyExits) {
    return res.status(400).json({ message: "User Already Exits" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashPassword });
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;

  return res
    .status(201)
    .json(userObj, { message: "User Created Successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All Field are required" });
  }
  const AlreadyExits = await User.findOne({ email }).select("+password");
  if (!AlreadyExits) {
    return res.status(400).json({ message: "User Not Exits" });
  }

  const isMatch = bcrypt.compareSync(password, AlreadyExits.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const accessToken = generateToken(AlreadyExits._id, AlreadyExits.role);
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: parseExpiresIn(config.JWT_EXPIRE),
  });

  const refreshToken = generateRefreshToken(
    AlreadyExits._id,
    AlreadyExits.role
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
  });

  const userObj = AlreadyExits.toObject();
  delete userObj.password;

  return res.status(200).json({
    message: "User Login Successfully",
    userObj,
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "User Logout Successfully" });
};

export const profile = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User Got", user });
};
