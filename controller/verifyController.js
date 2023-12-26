const path = require("path");
const pool = require("../db/db");

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // Check if the token is provided
        if (!token) {
            return res.status(400).send("Token is missing.");
        }

        const result = await pool.query(
            "UPDATE verification_tokens SET used=true WHERE token=$1 RETURNING *",
            [token]
        );

        // Check if any rows were affected by the update
        if (result.rowCount > 0) {
            console.log("Verification successful:", result.rows[0]);

            // Optionally, you might redirect the user to a success page
            // res.redirect('/verification-success');
            res.status(200).send(
                "<a href='http://localhost:5000/login'>Giriş Ekranı</a>"
            );
        } else {
            console.log("Invalid or expired token.");
            res.status(400).send("Invalid or expired token.");
        }
    } catch (err) {
        console.error("Error verifying email:", err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = verifyEmail;
