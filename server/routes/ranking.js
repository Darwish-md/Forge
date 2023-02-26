const express = require("express");
const config = require('config');
const {calculateEloRatings, getLeaguePoints } = require('../utils/eloRating');
const {Player} = require("../models/player");
const {getPlayerStatsByYear, getPlayerStatsByMonth} = require("../utils/playerStatistics");
const { getPlayerTotalStats } = require("../utils/totalStatistics");

const router = express.Router();

router.get("/:summonerName/:year", async (req, res) => {
    const API_KEY = config.get("riotAPIKey");
    const summonerName = req.params.summonerName;
    const player = await Player.findOne({name: req.params.summonerName});
    const matchStatistics = await getPlayerStatsByYear(player.name, req.params.year, API_KEY);     
    const eloRatings = await calculateEloRatings(matchStatistics, player.eloRating);
    res.status(200).send(eloRatings);
});


router.get("/:summonerName/:year/:month", async (req, res) => {
  const API_KEY = config.get("riotAPIKey");
  const summonerName = req.params.summonerName;
  const player = await Player.findOne({name: req.params.summonerName});
  const matchStatistics = await getPlayerStatsByMonth(player.name, req.params.year, req.params.month, API_KEY);     
  const eloRatings = await calculateEloRatings(matchStatistics, player.eloRating);
  res.status(200).send(eloRatings);
});

router.get("/:year/:month", async (req, res) => {
  const API_KEY = config.get("riotAPIKey");
  const players = await Player.find();
  const total = []
  for(player of players) {
    console.log(player.name)
    const matchStatistics = await getPlayerStatsByMonth(player.name, req.params.year, req.params.month, API_KEY);     
    const eloRatings = await calculateEloRatings(matchStatistics, player.eloRating);
    const currentEloRating = eloRatings[eloRatings.length-1];
    const totalStatistics = await getPlayerTotalStats(matchStatistics);
    totalStatistics['elo'] = currentEloRating;
    total.push(totalStatistics);
  }

  res.status(200).send(total);
});

module.exports = router;