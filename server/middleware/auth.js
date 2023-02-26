const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        //decoded is an object containing the player info { _id: this._id, name: this.name}
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.player = decoded; 
        next();
    }
    catch {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;