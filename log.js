const fs = require('fs');
const moment = require('moment');
const globalConf = require('./config');

const fileName = globalConf.log_path + globalConf.log_name;

function log(data) {
    fs.appendFile(fileName, nowDate() + data + '\n', {flag: 'a'}, function () {})
}

function nowDate() {
    const formatDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    return formatDate + ' ' + Date.now() + ' '
}

module.exports = log;