const express = require("express");
const skillsDeviation = require("../utils/skillsDeviation");
const Player = require("../models/player");
const router = express.Router();
const playerA = Player.findOne({name: ''});

//recommended player will depend on the previous year statistics achieved by the player
const today = new Date();
const previousYear = today.getFullYear() - 1;

router.get("/teammate", async(req, res) => {
    const players = Player.findAll();

    const nodes = [];
    for(player in players) {
        const totalScore = skillsDeviation(playerA.name, playerB.name);
        nodes.push({
            player: player.name,
            totalScore
        });
    }
    
    res.status(200).send(nodes);
});

router.get("/enemy", async(req, res) => {

});


module.exports = router;

