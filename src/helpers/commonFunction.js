'use strict';
const crypto = require('crypto');
const config = require('../../config/config.json');

const encrypt = (data) => {
  const mykey = crypto.createCipher('aes-128-cbc', config.jwtSecret);
  let mystr = mykey.update(data, 'utf8', 'hex');
  mystr += mykey.final('hex');
  return mystr;
};

const decryt = (data) => {
  const mykey = crypto.createDecipher('aes-128-cbc', config.jwtSecret);
  try {
    let mystr = mykey.update(data, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    return mystr;
  } catch (err) {
    return data;
  }
};


module.exports = {
  encrypt,
  decryt,
};
