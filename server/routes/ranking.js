const express = require("express");
const config = require('config');
const {calculateEloRatings } = require('../utils/eloRating');
const {Player} = require("../models/player");
const {getPlayerStatsByYear} = require("../utils/playerStatistics");
const {getSoloRankedMatches } = require("../utils/rankedMatches");
const {
    getSummonerIdByName,
    getMatchIdsBySummonerId,
    getMatchDataById,
  } = require("../service/riotService");

const router = express.Router();

router.get("/:summonerName/:year", async (req, res) => {
    const API_KEY = config.get("riotAPIKey");
    const summonerName = req.params.summonerName;
    const player = await Player.findOne({name: req.params.summonerName});
    const soloMatchesIds = await getPlayerStatsByYear(player.name, req.params.year, API_KEY);     
    const matchStatistics = []   
    for(matchId of soloMatchesIds) {
        const matchData = await getMatchDataById(matchId, 'americas', API_KEY);
        const player = matchData.info.participants.find(
            (p) => p.summonerName === summonerName
          );
          const matchStatisticsItem = {
            id: player.summonerId,
            matchId: matchId,
            username: player.summonerName,
            winLossRatio: player.win ? "1/0" : "0/1",
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            farm: player.totalMinionsKilled,
            healing: player.totalHeal,
            damageDealt: player.totalDamageDealtToChampions,
          };
        
        matchStatistics.push(matchStatisticsItem);
    }
    const eloRatings = await calculateEloRatings(matchStatistics, player.eloRating);
    res.status(200).send(eloRatings);
});

module.exports = router;