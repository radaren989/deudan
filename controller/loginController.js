const path = require("path");
const bcrypt = require("bcrypt");
const pool = require("../db/db");
const saltRounds = 10;

const checkLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Blank fields");
        return res.status(400).send("Blank Fields!");
    }

    // Validate email format
    if (!isEmailValid(email)) {
        console.log("Non-valid email");
        return res.status(400).send("Non-valid Email!");
    }

    if (!(await checkEmailValification(email))) {
        return res.status(400).send("Email Varification Not completed!");
    }
    if (await checkPassword(email, password)) {
        const id = await getUserId(email);
        if (id != null) {
            req.session.auth = id;
            req.session.email = email;
            return res.status(200).send("successful");
        }
    } else {
        return res.status(400).send("wrong credientals");
    }
    res.status(401).send("unsuccessful");
};
const getUserId = async (email) => {
    try {
        const result = await pool.query(
            "SELECT user_id FROM account WHERE email=$1",
            [email]
        );
        if (result.rows.length > 0) {
            return result.rows[0].user_id;
        }
        return null; // Email not found
    } catch (error) {
        console.error("Error fetching hashed password:", error);
        throw error;
    }
};
const checkEmailValification = async (email) => {
    try {
        const result = await pool.query(
            "SELECT used FROM verification_tokens WHERE email=$1",
            [email]
        );

        if (result.rows.length > 0) {
            return result.rows[0].used;
        }
        return false;
    } catch (error) {
        console.error("Error fetching valid data: ", error);
        throw error;
    }
};
const getHashedPasswordFromDatabase = async (email) => {
    try {
        const result = await pool.query(
            "SELECT passwrd FROM account WHERE email=$1",
            [email]
        );
        if (result.rows.length > 0) {
            return result.rows[0].passwrd;
        }
        return null; // Email not found
    } catch (error) {
        console.error("Error fetching hashed password:", error);
        throw error;
    }
};

const checkPassword = async (email, enteredPassword) => {
    try {
        // Get the hashed password from the database
        const hashedPassword = await getHashedPasswordFromDatabase(email);

        if (!hashedPassword) {
            return false; // Email not found
        }

        // Compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(
            enteredPassword,
            hashedPassword
        );

        return passwordMatch;
    } catch (error) {
        console.error("Error checking password:", error);
        throw error;
    }
};

function isEmailValid(email) {
    const domainPattern = /@ogr\.deu\.edu\.tr$/;

    return domainPattern.test(email);
}

const getLogin = (req, res) => {
    res.sendFile(path.resolve("./layouts/login.html"));
};

module.exports = { getLogin, checkLogin };
