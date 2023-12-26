const getAdvert = (req, res) => {
    const { number } = req.params;
    console.log(number);
    console.log("asd");
    res.send("31");
};

module.exports = { getAdvert };
