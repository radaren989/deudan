const express = require("express");
const router = express.Router();
const { getAdverts, getAccounts } = require("../controller/apiController");

router.get("/listAdvert/:number", getAdverts).get("/accounts", getAccounts);

module.exports = router;
