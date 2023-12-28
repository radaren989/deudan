const path = require("path");

const getAdvert = async (req, res) => {
    try {
        return res.status(200).sendFile(path.resolve("./layouts/advert.html"));
    } catch (error) {
        console.error("Error: Fetching advert page: ", error);
        throw error;
    }
};

module.exports = { getAdvert };
