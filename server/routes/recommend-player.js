const express = require("express");
const skillsDeviation = require("../utils/skillsDeviation");
const Player = require("../models/player");
const router = express.Router();

router.get("/", async (req, res) => {
  //recommended player will depend on the previous year statistics achieved by the player
  //it can be changed according to requirements, so last month, last 3 months, total with no time limit, etc ..
  const today = new Date();
  const previousYear = today.getFullYear() - 1;

  const playerA = await Player.findOne({ name: "nalamango" });

  const players = Player.findAll();

  const nodes = [];
  for (player in players) {
    const totalScore = skillsDeviation(playerA.name, playerB.name, previousYear);
    nodes.push({
      player: player.name,
      totalScore,
    });
  }

  res.status(200).send(nodes);
});

module.exports = router;
