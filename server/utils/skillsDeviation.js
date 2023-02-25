const { getPlayerStatsByYear } = require("./playerStatistics");
const { getPlayerTotalStats } = require("./totalStatistics");

const skillsDeviation = (playerA, playerB, year) => {
        // Retrieve data from Riot API and assign it to player objects
        PlayerAMatches = getPlayerStatsByYear(playerA, year);
        PlayerBMatches = getPlayerStatsByYear(playerB, year);

        statsPlayerA = getPlayerTotalStats(PlayerAMatches);
        statsPlayerB = getPlayerTotalStats(PlayerBMatches);

        // Calculate the difference in kill/death ratio between the two players
        const kdDifference = statsPlayerA.kills / statsPlayerA.deaths - statsPlayerB.kills / statsPlayerB.deaths;
      
        // Calculate the difference in win rate
        const winRateDifference = statsPlayerA.winrate - statsPlayerB.winrate;
      
        // Calculate the difference in objective participation
        const objectivesDifference = statsPlayerA.objectives - statsPlayerB.objectives;
      
        // Calculate the difference in vision score
        const visionScoreDifference = statsPlayerA.visionScore - statsPlayerB.visionScore;
      
        // Calculate the difference in damage dealt to champions
        const damageDealtDifference = statsPlayerA.damageDealt - statsPlayerB.damageDealt;
      
        // Calculate the difference in supportive actions
        const supportScoreDifference = statsPlayerA.supportScore - statsPlayerB.supportScore;
      
        // Calculate a total score based on the differences in each metric
        const totalScore = kdDifference + winRateDifference + objectivesDifference + visionScoreDifference + damageDealtDifference + supportScoreDifference;

        return totalScore;
      
}