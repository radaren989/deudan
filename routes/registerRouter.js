const express = require("express");
const router = express.Router();
const { getRegister } = require("../controller/registerController");

router.get("/", getRegister);

module.exports = router;
