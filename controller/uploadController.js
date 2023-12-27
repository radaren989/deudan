const path = require("path");

const getUpload = (req, res) => {
    res.sendFile(path.resolve("./layouts/upload.html"));
};

const postAdvert = (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.status(200);
};

module.exports = { getUpload, postAdvert };
