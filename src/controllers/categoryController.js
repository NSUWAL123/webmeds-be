const medicine = (req, res) => {
    res.send("In medicines");
}

const baby = (req, res) => {
    res.send("In baby");
}

const personalcare = (req, res) => {
    res.send("In personalcare");
}

module.exports = {medicine, baby, personalcare};
