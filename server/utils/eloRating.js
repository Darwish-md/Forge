const axios = require("axios");
const config = require("config");

async function calculateEloRatings(matchStatistics, initialEloRating) {
    const API_KEY = config.get("riotAPIKey");
  
    const eloRatings = [];
    for (const match of matchStatistics) {
      const { username, winLossRatio, matchId } = match;
  
      const opponents = await getOpponents(
        username,
        matchId,
        API_KEY
      );
  
      const opponentLeaguePointsArray = await Promise.all(
        opponents.map((op) =>
          getLeaguePoints(op.summonerId, API_KEY)
        )
      );
  
      const opponentEloRatingArray = opponentLeaguePointsArray.map(
        (opponentLeaguePoints) => opponentLeaguePoints / 20 + 1000
      );
  
      const opponentEloRating =
        opponentEloRatingArray.reduce((sum, rating) => sum + rating, 0) /
        opponentEloRatingArray.length;
  
      const expectedOutcome =
        1 / (1 + 10 ** ((opponentEloRating - initialEloRating) / 400));
      const actualOutcome = winLossRatio === "1/0" ? 1 : 0.5;
  
      const k = 50;
      const newEloRating = Math.round(
        initialEloRating + k * (actualOutcome - expectedOutcome)
      );
  
      eloRatings.push(newEloRating);
    }
  
    return eloRatings;
  }


  async function getOpponents(username, matchId, API_KEY) {
    const region = 'americas';
    const matchDataUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const response = await axios.get(matchDataUrl, {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    });
  
    const participantIdentity = response.data.info.participants.find(
      (p) => p.summonerName.toLowerCase() === username.toLowerCase()
    );
    const participantTeamId = participantIdentity.teamId;
  
    const opposingTeam = response.data.info.teams.find(
      (t) => t.teamId !== participantTeamId
    );
  
    const opposingParticipants = response.data.info.participants.filter(p => p.teamId == opposingTeam.teamId)
  
    return opposingParticipants;
  }


async function getLeaguePoints(id, API_KEY) {
  const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}/?api_key=${API_KEY}`

  const response = await axios.get(url);
  if(response.data.length === 0) return 1000;
  return response.data[0].leaguePoints;
}

module.exports = { calculateEloRatings, getLeaguePoints };


