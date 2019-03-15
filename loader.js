const fs = require('fs');
const globalConf = require('./config');
const pathMap = new Map();

const files = fs.readdirSync(globalConf['web_path']);
for (let i = 0; i < files.length; i ++) {
    const temp = require('./' + globalConf['web_path'] + '/' + files[i]);
    const path = temp.path;
    if (path) {
        for (let [k, v] of path) {
            if (pathMap.get(k) == null) {
                pathMap.set(k, v);
            } else {
                throw new Error('url path异常，URL：' + k);
            }
        }
    }
}

module.exports = pathMap;