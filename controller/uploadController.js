const path = require("path");

const getUpload = (req, res) => {
    res.sendFile(path.resolve("./layouts/upload.html"));
};

const postAdvert = (req, res) => {
    const { file } = req.body;
    console.log(file);
    res.status(200);
};

module.exports = { getUpload, postAdvert };
