const express = require("express");
const { Player } = require("../models/player");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.message);

  let player = await Player.findOne({ name: req.body.name});
  if (!player) return res.status(400).send("Invalid email or password.");
  
  const validPassword = await bcrypt.compare(req.body.password, player.password);
  if(!validPassword) return res.status(400).send('Invalid name or password.');
  
  const token = player.generateAuthToken();

  res.send(token);
});

function validateLogin(player) {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required()
    });
    return schema.validate(player);
}

module.exports = router;