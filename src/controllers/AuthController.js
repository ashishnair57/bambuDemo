const jwt = require('jsonwebtoken');
const { success, error } = require('../http/restResponse');
const { encrypt, decryt } = require('../helpers/commonFunction');
const { jwtSecret, tokenLife, jwtRefreshSecret, refreshTokenLife } = require('../../config/config.json');
const UserModel = require("../models/UserModel");
var md5 = require('md5');
const refreshTokens = {};

class AuthController {
    login(req, res) {
        auth(req.body).then((resp) => {
            
            let token = jwt.sign(resp, jwtSecret, {
                expiresIn: tokenLife,
            });
            
            token = encrypt(token);
            
            resp.password = req.body.password;

            let refreshToken = jwt.sign(resp, jwtRefreshSecret, {
                expiresIn: refreshTokenLife,
            });
            refreshToken = encrypt(refreshToken);

            refreshTokens[refreshToken] = refreshToken;

            delete resp.password;

            const response = {
                'loggedin': true,
                'token': token,
                'refreshToken': refreshToken,
                'data': resp.data,
            };
            res.status(200).json(success(response));
        }).catch((err) => {
            if (err.statusCode) {
                res.status(err.statusCode).json(error(err.statusCode, err.error));
            } else {
                res.status(500).json(error(500, 'Something went wrong.'));
            }
        })
    }

    refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;
        if ((refreshToken) && (refreshToken in refreshTokens)) {
            jwt.verify(decryt(refreshToken), jwtRefreshSecret, (err, decoded) => {
                if (err) {
                    res.status(500).json(error(500, 'Something went wrong.'));
                } else {
                    auth({ 'email': decoded.email, 'password': decoded.password }).then((resp) => {
                        const token = jwt.sign(resp, jwtSecret, {
                            expiresIn: tokenLife,
                        });

                        const response = {
                            'token': encrypt(token),
                        };
                        res.status(200).json(success(response));
                    }).catch((err) => {
                        if (err.statusCode) {
                            res.status(err.statusCode).json(error(err.statusCode, err.error));
                        } else {
                            res.status(500).json(error(500, 'Something went wrong.'));
                        }
                    });
                }
            });
        } else {
            res.send(401);
        }
    }
}

function auth(data) {
    return new Promise((resolve, reject) => {
        UserModel.search(data.email, md5(data.password)).then((resp) => {
            if (resp.length) {
                resp = JSON.parse(JSON.stringify(resp))
                resolve(resp[0]);
            } else {
                reject({ 'statusCode': 401, 'error': 'Incorrect email / password.' });
            }
        }).catch((err) => {
            console.log("err",err)
            reject({ 'statusCode': 500, 'error': 'Something went wrong.' });
        })
    });
}


module.exports = new AuthController();