/*Register all the middleware*/
const fs = require('fs');

fs.readdirSync(__dirname + '/').forEach(function (file) {
    if (file.match(/\.json$/) !== null && file !== 'index.json') {
        var name = file.replace('.json', '');
        exports[name] = require('./' + file);
    }
});