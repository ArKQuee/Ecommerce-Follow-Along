const express = require("express");
const { testRoute } = require("../controllers/userController");

const router = express.Router();

router.get("/test", testRoute);

module.exports = router;
