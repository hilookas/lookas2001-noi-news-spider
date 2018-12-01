'use strict';

const message = require('./message.js');

function info(msg) {
    console.info('[' + (new Date()).toISOString() + '] info: ' + msg);
}

function log(msg) {
    console.log('[' + (new Date()).toISOString() + '] log: ' + msg);
}

function warn(msg) {
    console.warn('[' + (new Date()).toISOString() + '] warn: ' + msg);
}

function error(msg) {
    console.error('[' + (new Date()).toISOString() + '] error: ' + msg);
    
    // 转发到管理员通道
    let result = null;
    if ((result = /^Fail to update list form ccfNoi: /.exec(msg)) !== null) { // 与源站连接失败
        message(msg + Math.random(), 0);
    } else if ((result = /^Fail to send (created|updated) notice from ccfNoi: /.exec(msg)) !== null) { // 与推送连接失败
        message(msg + Math.random(), 0);
    }
}

module.exports = { info, log, warn, error };
