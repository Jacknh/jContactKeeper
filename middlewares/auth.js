const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send("Unauthorized");
  }

  const token = auth.split(" ")[1];

  let decoded = null;

  try {
    decoded = jwt.verify(token, "secret");
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  next();
});

module.exports = {
  protect,
};
