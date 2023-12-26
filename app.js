const express = require("express");
const session = require("express-session");
const { checkSession, validateCookie } = require("./controller/sessionMidware");
const app = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(
    session({
        secret: "your-secret-key", // Change this to a secret key for production
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 5 * 60 * 1000 },
    })
);

//routers
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const verifyRouter = require("./routes/verifyRouter");
const apiRouter = require("./routes/apiRouter");
const mainRouter = require("./routes/mainRouter");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/verify", verifyRouter);
app.use("/api", apiRouter);
app.use("/", checkSession, mainRouter);

app.get("/view-sessions", (req, res) => {
    // Note: This is for demonstration purposes only. Avoid using this in production.
    const activeSessions = req.sessionStore.sessions;
    res.json(activeSessions);
});

app.get("/logout", (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Logout successful!");
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
