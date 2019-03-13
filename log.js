const fs = require('fs');
const globalConf = require('./config');

const fileName = globalConf.log_path + globalConf.log_name;

function log(data) {
    const time = new Date();
    fs.appendFile(fileName, time + '\n' + data + '\n\n', {flag: 'a'}, function () {})
}
module.exports = log;