const pool = require("../db/db");

const getAdverts = async (req, res) => {
    try {
        const { number, parameter } = req.params;
        const data = await getAdvertJson(parseInt(number), parameter);
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error adverts databse: ", error);
        res.status(500).json({ success: false, message: error });
    }
};

const getAccounts = async (req, res) => {
    try {
        const data = await getAccountJson();
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error account database: ", error);
        res.status(500).json({ success: false, message: error });
    }
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

const getAccountJson = async () => {
    try {
        const data = await pool.query("SELECT * FROM account");
        return data.rows;
    } catch (error) {
        console.error("API DATABASE ERRO: ", error);
        throw error;
    }
};

module.exports = { getAdverts, getAccounts };
