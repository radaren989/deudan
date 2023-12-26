const express = require("express");
const router = express.Router();
const verifyEmail = require("../controller/verifyController");

router.get("/", verifyEmail);

module.exports = router;
