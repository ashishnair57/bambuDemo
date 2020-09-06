'use strict';

const db = require("./index.js");
const mysql = require("mysql");

class ProductModel {

    async search(data) {
        return new Promise((resolve, reject) => {
            let condition = []
            let sql = 'select ';
            if (data.showOnly) {
                data.showOnly = JSON.parse(data.showOnly)
                data.showOnly.map((row) => {
                    sql += row + ",";
                    // condition.push(row)
                })
                sql = sql.replace(/,\s*$/, "");
            } else {
                sql += "id,code,name ";
            }

            sql += ' from products ';

            if (data.filterByCodes || data.filterByNames) {
                sql += 'where ';
            }

            if (data.filterByCodes) {
                sql += 'code in (';
                data.filterByCodes = JSON.parse(data.filterByCodes)

                data.filterByCodes.map((row) => {
                    sql += "?,";
                    condition.push(row)
                })
                sql = sql.replace(/,\s*$/, "");
                sql += ') ';

                if (data.filterByNames) {
                    sql += 'and ';
                }
            }

            if (data.filterByNames) {
                sql += 'name in (';
                data.filterByNames = JSON.parse(data.filterByNames)

                data.filterByNames.map((row) => {
                    sql += "?,";
                    condition.push(row)
                })
                sql = sql.replace(/,\s*$/, "");
                sql += ') ';
            }


            if (data.pageNumber && data.itemsPerPage) {

                sql += "LIMIT ? OFFSET ? "

                let limit = parseInt(data.itemsPerPage);
                condition.push(limit);
                let offset = parseInt((data.pageNumber - 1) * data.itemsPerPage);
                condition.push(offset);
            }

            sql = mysql.format(sql, condition);
            console.log(2, sql)
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

    async count(data) {
        return new Promise((resolve, reject) => {
            let condition = [];
            let sql = "SELECT count(id) as count FROM `products` ";

            if (data.filterByCodes || data.filterByNames) {
                sql += 'where ';
            }
            console.log("33333",data)
            if (data.filterByCodes) {
                sql += 'code in (';
                data.filterByCodes = JSON.parse(data.filterByCodes)

                data.filterByCodes.map((row) => {
                    sql += "?,";
                    condition.push(row)
                })
                sql = sql.replace(/,\s*$/, "");
                sql += ') ';

                if (data.filterByNames) {
                    sql += 'and ';
                }
            }
            console.log("4444",data)

            if (data.filterByNames) {
                sql += 'name in (';
                data.filterByNames = JSON.parse(data.filterByNames)

                data.filterByNames.map((row) => {
                    sql += "?,";
                    condition.push(row)
                })
                sql = sql.replace(/,\s*$/, "");
                sql += ') ';
            }
            console.log(3,sql)
            sql = mysql.format(sql, condition);
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

module.exports = new ProductModel();