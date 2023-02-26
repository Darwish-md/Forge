const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { boolean } = require("joi");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  eloRating: {
    type: Number,
    required: true,
    default: 1200
  }
});

playerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Player = new mongoose.model("player", playerSchema);

function validatePlayer(player) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(10).max(100).required(),
  });

  return schema.validate(player);
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
}
module.exports = { Player, validatePlayer, hashPassword };
