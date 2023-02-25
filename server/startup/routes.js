const express = require("express");
const stats = require("../routes/stats");
const eloRating = require("../routes/EloRating");
//const auth = require('../routes/auth');
//const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/users/statistics", stats);
    app.use("/api/ranked-leaderboards", eloRating);
    //app.use("/api/auth", auth);
    //app.use(error);
}