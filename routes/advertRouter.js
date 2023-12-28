const express = require("express");
const router = express.Router();

const { getAdvert } = require("../controller/advertController");

router.get("/:id", getAdvert);

module.exports = router;
