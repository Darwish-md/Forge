const express = require("express");
const stats = require("../routes/stats");
const ranking = require("../routes/ranking");
const relationship = require("../routes/relationship");
const players = require("../routes/players");
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/players/statistics", stats);
    app.use("/api/rank", ranking);
    app.use("/api/relationship", relationship);
    app.use("/api/players", players);
    app.use("/api/auth", auth);
    app.use(error);
}
