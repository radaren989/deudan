const path = require("path");
const pool = require("../db/db");
const bcrypt = require("bcrypt");

const createAccount = async (req, res) => {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
        console.log("blank fields");
        return res.sendFile(path.resolve("./layouts/register.html"));
    }
    if (!isEmailValid(email)) {
        console.log("non valid email");
        return res.sendFile(path.resolve("./layouts/register.html"));
    }
    if (await isAlreadyExist(email)) {
        console.log("already registered");
        return res.sendFile(path.resolve("./layouts/login.html"));
    }
    console.log(name, surname, email, password);
    await pool.query(
        "INSERT INTO account (name, surname, email, passwrd) values($1,$2,$3,$4)",
        [name, surname, email, password]
    );
    res.send("selam");
};

async function isAlreadyExist(email) {
    try {
        const result = await pool.query(
            "SELECT * FROM account WHERE email = $1",
            [email]
        );
        console.log(result.rowCount);
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error;
    }
}
function isEmailValid(email) {
    const domainPattern = /@ogr\.deu\.edu\.tr$/;

    return domainPattern.test(email);
}

const getRegister = (req, res) => {
    res.sendFile(path.resolve("./layouts/register.html"));
};

module.exports = { getRegister, createAccount };
