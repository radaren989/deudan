const express = require("express");
const router = express.Router();
const {
    getAdverts,
    getAccounts,
    getSingleAdvert,
    getProfileInfo,
} = require("../controller/apiController");

router
    .get("/listAdvert/:number", getAdverts)
    .get("/accounts", getAccounts)
    .get("/advert/:id", getSingleAdvert)
    .get("/profile", getProfileInfo);

module.exports = router;
