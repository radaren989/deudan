const pool = require("../db/db");
const getAdvert = async (req, res) => {
    const { number } = req.params;
    res.json({ success: true, data: number });
};

const getAdvertJson = async (number, parameter) => {
    try {
        const data = await pool.query(
            "SELECT * FROM advert_list_view ORDER BY $1 OFFSET $2 LIMIT $3",
            [parameter, 10 * (number - 1), number * 10]
        );
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("API DATABASE ERRO: ", error);
        throw error;
    }
};

module.exports = { getAdvert };
