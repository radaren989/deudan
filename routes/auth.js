const express = require("express");
const router = express.Router();
const { authFunc, registerFunc } = require("../controller/auth");

router.get("", authFunc);
router.post("", registerFunc);

module.exports = router;
