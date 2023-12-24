const express = require("express");
const router = express.Router();
const {
    getRegister,
    createAccount,
} = require("../controller/registerController");

router.get("/", getRegister).post("/", createAccount);

module.exports = router;
