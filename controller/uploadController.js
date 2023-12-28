const path = require("path");
const pool = require("../db/db");

const getUpload = (req, res) => {
    res.sendFile(path.resolve("./layouts/upload.html"));
};

const postAdvert = async (req, res) => {
    try {
        if (req.body && req.files) {
            const { title, description, price, category } = req.body;
            const user_id = req.session.auth;
            const photoResult = await addPhotoData(req.files);
            const descResult = await pool.query(
                "INSERT INTO description (ad_date, price, details, photo_id) VALUES($1,$2,$3,$4) RETURNING *",
                [
                    new Date(),
                    parseFloat(price),
                    description,
                    photoResult.rows[0].photo_id,
                ]
            );
            const cat_id = await pool.query(
                "SELECT cat_id FROM categories where name=$1",
                [category]
            );

            const advertResult = await pool.query(
                "INSERT INTO advert (title,cat_id,desc_id) VALUES($1,$2,$3) RETURNING *",
                [title, cat_id.rows[0].cat_id, descResult.rows[0].desc_id]
            );

            await pool.query(
                "INSERT INTO advert_owner (user_id, ad_id) VALUES($1,$2)",
                [user_id, advertResult.rows[0].ad_id]
            );

            return res.status(200).send("31");
        }
        res.status(400).send("olmadı");
    } catch (error) {
        console.error("ERROR: ADVERT POST ERROR: ", error);
        throw error;
    }
};

const addPhotoData = async (files) => {
    let result = null;
    switch (files.length) {
        case 1:
            result = await pool.query(
                "INSERT INTO photos (photo_0) VALUES($1) RETURNING *",
                [files[0]]
            );
            break;
        case 2:
            result = await pool.query(
                "INSERT INTO photos (photo_0,photo_1) VALUES($1,$2)RETURNING *",
                [files[0], files[1]]
            );
            break;
        case 3:
            result = await pool.query(
                "INSERT INTO photos (photo_0,photo_1,photo_3) VALUES($1,$2,$3) RETURNING *",
                [files[0], files[1], files[2]]
            );
            break;
        case 4:
            result = await pool.query(
                "INSERT INTO photos (photo_0,photo_1,photo_3,photo_4) VALUES($1,$2,$3,$4) RETURNING *",
                [files[0], files[1], files[2], files[3]]
            );
            break;
        default:
            throw "There is no photo";
            break;
    }
    return result;
};

module.exports = { getUpload, postAdvert };
