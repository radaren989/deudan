const express = require("express");
const app = express();
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");

app.use(express.static(__dirname));
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(5000, () => {
    console.log("listening on port 5000");
});
