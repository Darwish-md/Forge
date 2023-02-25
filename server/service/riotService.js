const axios = require("axios");

const getSummonerIdByName = async (summonerName, API_KEY) => {
  const summonerResponse = await axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
  );

  const summonerId = summonerResponse.data.puuid;

  return summonerId;
};

const getMatchIdsBySummonerId = async (summonerId, startTime, endTime, region, API_KEY) => {
  const matchType = "normal";
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerId}/ids?type=${matchType}&startTime=${startTime}&endTime=${endTime}`;

  const matchIdsResponse = await axios.get(url, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
  });

  const matchIds = matchIdsResponse.data;

  return matchIds;
};

const getMatchDataById = async (matchId, region, API_KEY) => {
  const matchDataUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const matchDataResponse = await axios.get(matchDataUrl, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
  });

  const matchData = matchDataResponse.data;
  return matchData;
};

module.exports = {
  getSummonerIdByName,
  getMatchIdsBySummonerId,
  getMatchDataById,
};
