const express = require("express");
const session = require("express-session");
const app = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

//routers
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const verifyRouter = require("./routes/verifyRouter");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/verify", verifyRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
