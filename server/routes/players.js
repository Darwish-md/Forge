const express = require("express");
const _ = require('lodash');
const { Player, validatePlayer, hashPassword } = require("../models/player");
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const player = await Player.findById(req.player.name).select('-password');
    res.send(player);
});

router.post("/", async (req, res) => {
  const { error } = validatePlayer(req.body);
  if (error) return res.status(400).send(error.message);

  let player = await Player.findOne({ name: req.body.name});
  if (player) return res.status(400).send("This name is already registered.");
  
  player = new Player(_.pick(req.body, ['name', 'password']));
  player.password = await hashPassword(player.password);
  await player.save();

  const token = player.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(player, ['_id', 'name']));
});

module.exports = router;