const pool = require("../db/db");

//profile
const getProfileInfo = async (req, res) => {
    try {
        if (req.session) {
            const id = req.session.auth;
            const result = await getProfileInfoJson(id);
            res.status(200).json({ succes: true, data: result });
        }
    } catch (error) {
        console.error("Error: Fetching profile info: ", error);
        throw error;
    }
};

//delete advert
const deleteAdvert = async (req, res) => {
    try {
        const { id } = req.params;
        const resultOwner = await pool.query(
            "DELETE FROM advert_owner WHERE ad_id = $1",
            [id]
        );
        const resultAdvert = await pool.query(
            "DELETE FROM advert WHERE ad_id = $1",
            [id]
        );
        if (resultAdvert.rowCount > 0 && resultOwner.rowCount > 0)
            return res.status(200).json({ msg: "İlan silindi!" });
        res.status(500).json({ msg: "İlan silme hatasısı!" });
    } catch (error) {
        console.error("Error: Deleting Error: ", error);
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
        const { number, category } = req.params;
        let data = null;
        if (category !== "null") {
            data = await getAdvertsJson(parseInt(number), category);
        } else {
            data = await getAdvertsJson(parseInt(number), null);
        }
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
            "SELECT name,surname,email FROM account WHERE user_id = $1",
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

const getAdvertsJson = async (number, category) => {
    try {
        let data = null;
        if (category === null) {
            data = await pool.query(
                "SELECT * FROM advert_list_view ORDER BY ad_date ASC OFFSET $1 LIMIT $2",
                [10 * (number - 1), number * 10]
            );
        } else {
            data = await pool.query(
                "SELECT * FROM advert_list_view WHERE category = $3 ORDER BY ad_date ASC OFFSET $1 LIMIT $2",
                [10 * (number - 1), number * 10, category]
            );
        }
        data.rows.forEach((element, index, array) => {
            // let base64Image = Buffer.from(element.photo).toString("base64");
            element.photo = Buffer.from(element.photo);
        });
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

module.exports = {
    getAdverts,
    getAccounts,
    getSingleAdvert,
    getProfileInfo,
    deleteAdvert,
};
