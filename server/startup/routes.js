const express = require("express");
const stats = require("../routes/stats");
//const auth = require('../routes/auth');
//const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/users/statistics", stats);
    //app.use("/api/auth", auth);
    //app.use(error);
}