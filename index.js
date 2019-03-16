const http = require('http');
const url = require('url');
const fs = require('fs');
const globalConf = require('./config');
const loader = require('./loader');
const log = require('./log');

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const params = url.parse(req.url, true).query;
    log(pathName)

    const isStatic = isStaticRequest(pathName);
    if (isStatic) {//请求静态文件
        try {
            const data = fs.readFileSync(globalConf['page_path'] + pathName);
            res.writeHead(200);
            res.write(data);
            res.end();
        } catch(e) {
            res.writeHead(404);
            res.write('<html><body><h1>404 NotFound</h1></body></html>');
            res.end();
        }
    } else {//请求动态数据
        for (temp of loader) {
            if (new RegExp('^' + temp[0] + '$').test(pathName)) {
                temp[1](req, res);
                return;
            }
        }
        res.writeHead(404);
        res.write('<html><body><h1>404 NotFound</h1></body></html>');
        res.end();
    }
}).listen(globalConf['port']);

log('服务已启动');

function isStaticRequest (pathName) {
    let extensions = globalConf.static_file_type;
    for (let i = 0; i < extensions.length; i ++) {
        if (pathName.indexOf(extensions[i]) == pathName.length - extensions[i].length) {
            return true;
        }
    }
    return false;
}