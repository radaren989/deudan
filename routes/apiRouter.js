const express = require("express");
const router = express.Router();
const {
    getAdverts,
    getAccounts,
    getSingleAdvert,
    getProfileInfo,
    deleteAdvert,
} = require("../controller/apiController");

router
    .get("/listAdvert/:number/:category", getAdverts)
    .get("/accounts", getAccounts)
    .get("/advert/:id", getSingleAdvert)
    .get("/profile", getProfileInfo)
    .delete("/delete/:id", deleteAdvert);

module.exports = router;
