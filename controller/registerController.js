const path = require("path");
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRounds = 10;

const createAccount = async (req, res) => {
    const { name, surname, email, password } = req.body;

    // Validate input fields
    if (!name || !surname || !email || !password) {
        console.log("Blank fields");
        return res.status(400).send("Blank Fields!");
    }

    // Validate email format
    if (!isEmailValid(email)) {
        console.log("Non-valid email");
        return res.status(400).send("Non-valid Email!");
    }

    // Check if the email already exists
    if (await isAlreadyExist(email)) {
        console.log("Already registered");
        return res.status(400).send("Account Already Exists!");
    }

    // Generate a salt and hash the password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        // Hash the password
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            try {
                const verificationToken = await generateVerificationToken();

                await storeVerificationTokenInDatabase(
                    email,
                    verificationToken
                );

                await sendVerificationEmail(email, verificationToken);

                await pool.query(
                    "INSERT INTO account (name, surname, email, passwrd) VALUES ($1, $2, $3, $4)",
                    [name, surname, email, hash]
                );
                // Success response
                res.status(201).send("Account Created!");
            } catch (error) {
                // Handle database insertion error
                console.error("Error inserting into the database:", error);
                return res.status(500).send("Internal Server Error");
            }
        });
    });
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tugruldemir.45@gmail.com",
        pass: "ryuf vcjo hjvp dacu",
    },
});

async function generateVerificationToken() {
    const saltRounds = 10;
    const token = await bcrypt.hash(Date.now().toString(), saltRounds);
    return token;
}

async function storeVerificationTokenInDatabase(email, token) {
    await pool.query(
        "INSERT INTO verification_tokens (email, token) VALUES($1, $2)",
        [email, token]
    );
}

// Example function to send a verification email
async function sendVerificationEmail(email, token) {
    const verificationUrl = `http://localhost:5000/verify?token=${token}`;

    const mailOptions = {
        from: "tugruldemir.45@gmail.com",
        to: email,
        subject: "Verify Your Email",
        text: `Click the following link to verify your email: ${verificationUrl}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}
async function isAlreadyExist(email) {
    try {
        const result = await pool.query(
            "SELECT * FROM account WHERE email = $1",
            [email]
        );
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
