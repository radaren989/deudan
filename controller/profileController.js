const path = require("path");
const getProfile = (req, res) => {
    res.status(200).sendFile(path.resolve("./layouts/profile.html"));
};

module.exports = { getProfile };
