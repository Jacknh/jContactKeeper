const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// @desc      Register
// @route     /api/auth/register
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });

  res.status(200).json({ token });
});

// @desc      Login
// @route     /api/auth/login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).send("Invalid Credentials");
  }

  if (!password) {
    return res.status(400).send('Invalid Credentials');
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).send('Invalid Credentails')
  }

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });

  res.status(200).json({ token });

});


// @desc      Get Logged in user
// @route     /api/auth/getMe
// @access    Private
const getMe = (req, res, next) => {
  res.status(200).json({user: req.user})
}

module.exports = {
  register,
  login,
  getMe
};
