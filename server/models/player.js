const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  currentEloRating:{
    type: Number,
    required: true, 
    default: 1000
  },
  eloRatings: {
    type: [Number],
  }
});

const Player = new mongoose.model("player", playerSchema);

module.exports = Player;
