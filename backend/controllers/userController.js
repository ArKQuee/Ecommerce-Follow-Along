const User = require("../models/User");

// @desc   Test route
// @route  GET /api/users/test
const testRoute = (req, res) => {
  res.json({ message: "User route is working!" });
};

module.exports = { testRoute };
