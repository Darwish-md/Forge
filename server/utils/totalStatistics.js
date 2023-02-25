function getPlayerTotalStats (matchStatistics) {
    const totalStatistics = matchStatistics.reduce((acc, cur) => {
        return {
          id: cur.id,
          username: cur.username,
          win: acc.win + Number(cur.winLossRatio.split('/')[0]),
          loss: acc.loss + Number(cur.winLossRatio.split('/')[1]),
          kills: acc.kills + cur.kills,
          deaths: acc.deaths + cur.deaths,
          assists: acc.assists + cur.assists,
          farm: acc.farm + cur.farm,
          healing: acc.healing + cur.healing,
          damageDealt: acc.damageDealt + cur.damageDealt,
        };
      }, {
        id: '',
        username: '',
        win: 0,
        loss: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        farm: 0,
        healing: 0,
        damageDealt: 0,
      });
  
      return totalStatistics;
}

module.exports = { getPlayerTotalStats }