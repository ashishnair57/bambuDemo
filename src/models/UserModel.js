'use strict';

const db = require("./index.js");
const mysql = require("mysql");

class UserModel {
    search(email, password) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT id,name,email FROM ?? WHERE ?? = ? and ?? = ?";
            let inserts = ['users', 'email', email, 'password', password];
            sql = mysql.format(sql, inserts);
            db.query(sql, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    }
}

module.exports = new UserModel();