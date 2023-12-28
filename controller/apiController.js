const pool = require("../db/db");

//profile
const getProfileInfo = async (req, res) => {
    try {
        if (req.session) {
            const id = req.session.auth;
            const result = await getProfileInfoJson(id);
            console.log(result);
            res.status(200).json({ succes: true, data: result });
        }
    } catch (error) {
        console.error("Error: Fetching profile info: ", error);
        throw error;
    }
};

//advert page
const getSingleAdvert = async (req, res) => {
    try {
        if (req.params) {
            const { id } = req.params;
            const result = await pool.query(
                "SELECT * FROM advert_view WHERE advert_id = $1",
                [parseInt(id)]
            );
            console.log(result.rows[0]);
            res.json({ success: true, data: result.rows[0] });
        }
    } catch (error) {
        console.error("Error: Fetching advert from database: ", error);
        res.status(500).json({ success: false, message: error });
        throw error;
    }
};

//main page
const getAdverts = async (req, res) => {
    try {
        const { number } = req.params;
        const data = await getAdvertsJson(parseInt(number));
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error adverts databse: ", error);
        res.status(500).json({ success: false, message: error });
        throw error;
    }
};

//get accounts
const getAccounts = async (req, res) => {
    try {
        const data = await getAccountJson();
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error account database: ", error);
        res.status(500).json({ success: false, message: error });
        throw error;
    }
};

const getProfileInfoJson = async (id) => {
    try {
        const accountResult = await pool.query(
            "SELECT name,surname,email FROM account WHERE user_id = $1 ",
            [parseInt(id)]
        );
        const advertsResult = await pool.query(
            "SELECT * FROM advert_list_view WHERE user_id = $1",
            [parseInt(id)]
        );

        const result = {
            profile: accountResult.rows[0],
            adverts: advertsResult.rows,
        };
        return result;
    } catch (error) {
        console.error("API DATABASE ERROR: ", error);
        throw error;
    }
};

const getAdvertsJson = async (number, parameter) => {
    try {
        const data = await pool.query(
            "SELECT * FROM advert_list_view OFFSET $1 LIMIT $2",
            [10 * (number - 1), number * 10]
        );
        return data.rows;
    } catch (error) {
        console.error("API DATABASE ERROR: ", error);
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

module.exports = { getAdverts, getAccounts, getSingleAdvert, getProfileInfo };
