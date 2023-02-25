const Joi = require("joi");
const mongoose = require("mongoose");

const match = new mongoose.model("Movie", new mongoose.Schema({
    
}));

function validateMatch(match) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().hex().length(24).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(match);
}

exports.Movie = Movie;
exports.validate = validateMovie;
