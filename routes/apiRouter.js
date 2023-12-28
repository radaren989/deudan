const express = require("express");
const router = express.Router();
const {
    getAdverts,
    getAccounts,
    getSingleAdvert,
} = require("../controller/apiController");

router
    .get("/listAdvert/:number", getAdverts)
    .get("/accounts", getAccounts)
    .get("/advert/:id", getSingleAdvert);

module.exports = router;
