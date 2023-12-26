const express = require("express");
const router = express.Router();
const { getLogin, checkLogin } = require("../controller/loginController");

router.get("/", getLogin).post("/", checkLogin);

module.exports = router;
