const path = require("path");

const getMain = (req, res) => {
    res.sendFile(path.resolve("./layouts/index.html"));
};

module.exports = { getMain };
