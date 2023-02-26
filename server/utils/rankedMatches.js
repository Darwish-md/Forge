const axios = require('axios');
const config = require("config");
const API_KEY = config.get("riotAPIKey");

async function getRankedGamesByQueue(summonerName, days, queueId, apiKey) {
    const region = 'na1'; // Change this to the region of the summoner
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
    const summonerInfo = await axios.get(url);
    const puuid = summonerInfo.data.puuid;
  
    const currentDate = new Date();
    const endDate = Math.round(currentDate.getTime() / 1000);
    const startDate = Math.round((currentDate.setDate(currentDate.getDate() - days)) / 1000);
  
    const matchIds = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${startDate}&endTime=${endDate}&queue=${queueId}&api_key=${apiKey}`);
    return matchIds.data;
  }

async function getSoloRankedMatches(summonerName, days, apiKey) {
  const solo1 = await getRankedGamesByQueue(summonerName,days, 420, apiKey)
  const solo2 = await getRankedGamesByQueue(summonerName,days, 4, apiKey)

  return [...solo1, ...solo2];
}

async function getTeamRankedMatches(summonerName, days, apiKey) {
  const m1 = await getRankedGamesByQueue(summonerName,days, 410, apiKey)
  const m2 = await getRankedGamesByQueue(summonerName,days, 470, apiKey)
  const m3 = await getRankedGamesByQueue(summonerName,days, 1100, apiKey)
  const m4 = await getRankedGamesByQueue(summonerName,days, 9,apiKey)
    
  return [...m1, ...m2, ...m3, ...m4]    
}


module.exports = {getSoloRankedMatches, getTeamRankedMatches, getRankedGamesByQueue}