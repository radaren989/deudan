const path = require("path");
const getRegister = (req, res) => {
    res.sendFile(path.resolve("./layouts/register.html"));
};

module.exports = { getRegister };
