import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register new user
 */
export const signup = async (req, res) => {
  try {
    // 1️⃣ Validate request body
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await User.create({
      email,
      password: hashedPassword
    });

    // 5️⃣ Respond
    res.status(201).json({
      message: "Signup successful"
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Server error during signup"
    });
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 */
export const login = async (req, res) => {
  try {
    // 1️⃣ Validate request body
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Respond
    res.json({
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login"
    });
  }
};
