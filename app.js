const express = require("express");
const app = express();
const routerAuth = require("./routes/auth");

app.use("/", routerAuth);

app.listen(3131);
