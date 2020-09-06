/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const restResponse = require('../http/restResponse');
const { decryt } = require('../helpers/commonFunction');

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(decryt(token), config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json(restResponse.error(401, 'Token is not valid'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).json(restResponse.error(400, 'Auth token is not supplied'));
  }
};
