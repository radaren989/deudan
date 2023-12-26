const pool = require("../db/db");
const checkSession = async (req, res, next) => {
    const auth = req.session.auth;
    const email = req.session.email;
    if (auth && email) {
        if (checkIdAndEmail(auth, email)) next();
        else res.status(307).redirect("/login");
    } else {
        res.status(307).redirect("/login");
    }
};

const checkIdAndEmail = async (id, email) => {
    try {
        const result = await pool.query(
            "SELECT user_id, email FROM account WHERE user_id=$1",
            [id]
        );
        if (result.rows.length > 0) {
            return (
                result.rows[0].user_id === id && result.rows[0].email === email
            );
        }
        return false; // Email not found
    } catch (error) {
        console.error("Error fetching hashed password:", error);
        throw error;
    }
};
const validateCookie = (req, res, next) => {
    const { cookies } = req;
    if ("session_id" in cookies) {
        console.log("session id exist");
    } else res.status(403).send({ msg: "Not Authenticated" });
};

module.exports = { checkSession, validateCookie };
