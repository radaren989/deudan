const pool = require("../db/db");
const getAdvert = async (req, res) => {
    const { number, parameter } = req.params;
    const data = await getAdvertJson(parseInt(number), parameter);
    res.json({ success: true, data: data });
};

const getAdvertJson = async (number, parameter) => {
    try {
        const data = await pool.query(
            "SELECT * FROM advert_list_view ORDER BY $1 OFFSET $2 LIMIT $3",
            [parameter, 10 * (number - 1), number * 10]
        );
        return data.rows;
    } catch (error) {
        console.error("API DATABASE ERRO: ", error);
        throw error;
    }
};

module.exports = { getAdvert };
