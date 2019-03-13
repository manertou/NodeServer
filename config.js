const fs = require('fs');
const globalConf = {};

//读取配置文件
const confs = fs.readFileSync('./server.conf').toString().split('\n');
for (let i = 0; i < confs.length; i ++) {
    const tempConf = confs[i].split('=');
    if (tempConf.length < 2) {
        continue;
    } else {
        globalConf[tempConf[0]] = tempConf[1];
    }
}

//判断配置文件是否包含静态文件的配置项
if (globalConf['static_file_type']) {
    globalConf['static_file_type'] = globalConf['static_file_type'].split('|');
} else {
    throw new Error('配置文件异常，缺少: static_file_type')
}

module.exports = globalConf;