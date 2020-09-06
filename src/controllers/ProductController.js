const ProductModel = require("../models/ProductModel");

class ProductController {

    async search(req, res) {

        let productData = await ProductModel.search(req.query);

        let result = {}
        if (req.query.pageNumber && req.query.itemsPerPage) {
            let totalRecord = await ProductModel.count(req.query);
            totalRecord = JSON.parse(JSON.stringify(totalRecord));
            totalRecord = totalRecord && totalRecord[0] ? totalRecord[0].count : 1;
            console.log(totalRecord)
            result.pagination = {
                itemsPerPage: parseInt(req.query.itemsPerPage),
                pageNumber: parseInt(req.query.pageNumber),
                numberOfPages: parseInt(Math.ceil(totalRecord / req.query.itemsPerPage))
            }
        }

        result.items = productData ? productData : [];

        res.status(200).json(result)
    }
}

// async function getRandomString(length) {
//     var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var result = '';
//     for (var i = 0; i < length; i++) {
//         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
//     }
//     return result;
// }

// async function randomIntFromInterval(min, max) { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


module.exports = new ProductController();