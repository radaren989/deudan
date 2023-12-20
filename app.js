const express = require("express");
const app = express();
const loginRoute = require("./routes/loginRouter");

app.use("/login", loginRoute);

app.listen(5000);
