const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      message: "User registered successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password is required" })
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not registered" })
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d"
      }
    )

    return res.status(200).json({
      token,
      message: "User logged in successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser
}