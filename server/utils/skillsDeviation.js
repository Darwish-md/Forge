const { getPlayerStatsByYear } = require("./playerStatistics");
const { getPlayerTotalStats } = require("./totalStatistics");

// ! this function gets an array of totalscores of players, and the player to which the scored are calculated
function calculateRelationshipScore(playerStats, username) {
  const player = playerStats.find(p => p.username === username);
  if (!player) {
    throw new Error(`Player ${username} not found`);
  }

  const scores = playerStats.map(p => {
    if (p.username === username) {
      return { username: p.username, score: 0 };
    }

    const score = p.win * 2 - p.loss + p.kills * 0.5 - p.deaths * 0.25 + p.damageDealt * 0.01 + p.leaguePoints * 0.1;
    return { username: p.username, score };
  });

  return scores.sort((a, b) => b.score - a.score);
}
// ! this function suggests players to play with based on relationship scores with the given username
function suggestPlayers(playerStats, username) {
  const scores = calculateScore(playerStats, username);
  const opponentThreshold = -10;
  const neutralThreshold = 10;

  const opponents = scores.filter(s => s.score < opponentThreshold).map(s => s.username);
  const neutrals = scores.filter(s => s.score >= opponentThreshold && s.score <= neutralThreshold).map(s => s.username);
  const partners = scores.filter(s => s.score > neutralThreshold).map(s => s.username);

  return { opponents, neutrals, partners };
}

// ! this function return ready to use data for the network graph.
function createGraphData(playerStats, username) {
  const { opponents, neutrals, partners } = suggestPlayers(playerStats, username);

  // Create nodes
  const nodes = [
    { id: username, type: 'player' },
    ...opponents.map(o => ({ id: o, type: 'opponent' })),
    ...neutrals.map(n => ({ id: n, type: 'neutral' })),
    ...partners.map(p => ({ id: p, type: 'partner' }))
  ];

  // Create links
  const links = [
    ...opponents.map(o => ({ source: username, target: o, value: -1 })),
    ...neutrals.map(n => ({ source: username, target: n, value: 0 })),
    ...partners.map(p => ({ source: username, target: p, value: 1 }))
  ];

  return { nodes, links };
}

module.exports = {calculateRelationshipScore, suggestPlayers, createGraphData}