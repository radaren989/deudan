const authFunc = (req, res) => {
    res.send("router fonksiyonu içinden salam");
};

const registerFunc = (req, res) => {
    //add database
    console.log("data base eklendi");
    res.send("son");
};

module.exports = { authFunc, registerFunc };
