const express = require("express");
const {getPlayerStatsByMonth, getPlayerStatsByYear} = require('../utils/playerStatistics');
const {getPlayerTotalStats} = require('../utils/totalStatistics');

const router = express.Router();

router.get("/:summonerName/:year", async (req, res) => {
    const summonerName = req.params.summonerName;
    const year = req.params.year;

    const playerStats = await getPlayerStatsByYear(summonerName, year);
    const playerTotalStats = await getPlayerTotalStats(playerStats);

    return res.status(200).send({
        playerStats,
        playerTotalStats
    });
});

router.get("/:summonerName/:year/:month", async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const summonerName = req.params.summonerName;
    
    const playerStats = await getPlayerStatsByMonth(summonerName, year, month);
    const PlayerTotalStats = await getPlayerTotalStats(playerStats);

    return res.status(200).send({
        playerStats,
        PlayerTotalStats
    });
});

module.exports = router;