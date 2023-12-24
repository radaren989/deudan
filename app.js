const express = require("express");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

//routers
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");

app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(5000, () => {
    console.log("listening on port 5000");
});
