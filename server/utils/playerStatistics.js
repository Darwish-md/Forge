const {
  getSummonerIdByName,
  getMatchIdsBySummonerId,
  getMatchDataById,
} = require("../service/riotService");

const config = require("config");

function getUnixTimestampFromDate(date) {
  return Math.floor(date.getTime() / 1000);
}

async function getPlayerStatsByDate(summonerName, startDate, endDate) {
  const API_KEY = config.get("riotAPIKey");
  const region = "americas"; // e.g. NA1, EUW1, KR, etc.

  const startTime = getUnixTimestampFromDate(startDate);
  const endTime = getUnixTimestampFromDate(endDate); 

  const summonerId = await getSummonerIdByName(summonerName, API_KEY);
  const matchIds = await getMatchIdsBySummonerId(
    summonerId,
    startTime,
    endTime,
    region,
    API_KEY
  );

  const matchStatistics = [];

  for (const matchId of matchIds) {
    const matchData = await getMatchDataById(matchId, region, API_KEY);
    const player = matchData.info.participants.find(
      (p) => p.puuid === summonerId
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

  return matchStatistics;
}

const getPlayerStatsByYear = async (summonerName, year) => {
  const startDate = new Date(Number(year), 0, 1);
  const endDate = new Date(Number(year) + 1, 0, 0);
  return await getPlayerStatsByDate(summonerName,startDate, endDate);
}

const getPlayerStatsByMonth = async (summonerName, year, month) =>  {
  const startDate = new Date(Number(year),Number(month)-1, 1);
  const endDate = new Date(Number(year), Number(month), 0);
  return await getPlayerStatsByDate(summonerName,startDate, endDate);
}

const getPlayerStatsByWeek = async (summonerName, year, month, week) =>  {
  const startDate = new Date(Number(year),Number(month), 1 + (Number(week) - 1) * 7);
  const endDate = new Date(Number(year), Number(month), 0);
  return await getPlayerStatsByDate(summonerName,startDate, endDate);
}

module.exports = { getPlayerStatsByYear, getPlayerStatsByMonth, getPlayerStatsByWeek };
