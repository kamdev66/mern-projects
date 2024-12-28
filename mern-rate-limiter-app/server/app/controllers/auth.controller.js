const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = async (req, res) => {
  const { full_name, mobile_number, password } = req.body;
  console.log(req.body);
  if (!mobile_number || !password || !full_name) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const existingUser = await User.findOne({ mobile_number });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this Mobile Number",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ body: mobile_number }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    const newUser = new User({
      mobile_number,
      full_name,
      password: hashedPassword,
      token,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User Registered successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  const { mobile_number, password } = req.body;
  console.log("req.bodyv", req.body);
  // Check if all required fields are provided
  if (!mobile_number || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ mobile_number });

    // If user is not found, return an error
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email ", success: false });
    }

    // Compare the password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return an error
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    // Return the user data and token
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        mobile_number: user.mobile_number,
        full_name: user.full_name,
        token: user.token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};
