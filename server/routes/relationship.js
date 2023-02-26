const express = require("express");
const skillsDeviation = require("../utils/skillsDeviation");
const Player = require("../models/player");
const router = express.Router();
const playerA = Player.findOne({name: ''});

//recommended player will depend on the previous year statistics achieved by the player
const today = new Date();
const previousYear = today.getFullYear() - 1;

router.get("/suggestPlayers/:summonerName", async(req, res) => {
    const players = Player.findAll();

    const year = new Date().getFullYear();
    const monthIndex = new Date().getMonth();
    const month = monthIndex + 1;

    const mainStats = await getPlayerStatsByYear(summonerName, year, month);
    const mainTotalStats = await getPlayerTotalStats(stats);

    const playersStats = [mainTotalStats];

    for(player in players) {
        const stats = await getPlayerStatsByYear(player.name, year, month);
        const totalStats = await getPlayerTotalStats(stats);
        playersStats.push(totalStats);
    }

    const data = skillsDeviation.suggestPlayers(playersStats, summonerName)

    res.status(200).send(data);
});


router.get("/graphData/:summonerName", async(req, res) => {
    const players = Player.findAll();

    const year = new Date().getFullYear();
    const monthIndex = new Date().getMonth();
    const month = monthIndex + 1;

    const mainStats = await getPlayerStatsByYear(summonerName, year, month);
    const mainTotalStats = await getPlayerTotalStats(stats);

    const playersStats = [mainTotalStats];

    for(player in players) {
        const stats = await getPlayerStatsByYear(player.name, year, month);
        const totalStats = await getPlayerTotalStats(stats);
        playersStats.push(totalStats);
    }

    const data = skillsDeviation.createGraphData(playersStats, summonerName)

    res.status(200).send(data);
});

module.exports = router;