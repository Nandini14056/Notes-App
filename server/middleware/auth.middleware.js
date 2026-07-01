const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../model/user.model");

const verifyJwt = async (req, res, next) => {
  try {
    const authHeder = req.header("Authorization");

    if (!authHeder) {
      return res.status(400).json({
        message: "token not found"
      })
    }

    const token = authHeder.split(" ")[1];

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    req.user = user;

    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  verifyJwt
}