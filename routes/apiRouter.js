const express = require("express");
const router = express.Router();
const { getAdvert } = require("../controller/apiController");

router.get("/listAdvert/:number/:parameter", getAdvert);

module.exports = router;
