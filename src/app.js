const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors')

class App {
    constructor() {
        this.port = process.env.PORT || 8080;
        this.app = express();
    }

    appConfig() {
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            }),
            bodyParser.json(),
            cors()
        );

        /* Included the routes*/
        this.app.use('/api', new routes(express).appRoutes());

        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }

    init() {
        this.appConfig();

        this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
    }
}

module.exports = App;