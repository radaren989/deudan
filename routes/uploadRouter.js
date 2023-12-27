const express = require("express");
const router = express.Router();
const { getUpload, postAdvert } = require("../controller/uploadController");

router.get("/", getUpload).post("/", postAdvert);

module.exports = router;
