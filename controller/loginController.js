const path = require("path");
const getLogin = (req, res) => {
    res.sendFile(path.resolve("./layouts/login.html"));
};

module.exports = { getLogin };
