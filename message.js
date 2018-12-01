'use strict';

const urllib = require('urllib');

const options = require('./options.js');

async function byEmail(msg, options) {
    // TODO
}

async function byAliSms(msg, options) {
    // TODO
}

async function byServerChan(msg, options) {
    try {
        const result = await urllib.request('https://sc.ftqq.com/' + options.key + '.send', {
            method: 'GET',
            data: {
              'text': msg,
              'desp': msg
            }
        });
        if (result.data.toString() !== '{"errno":0,"errmsg":"success","dataset":"done"}') {
            if (result.data.toString() === '{"errno":1024,"errmsg":"\\u4e0d\\u8981\\u91cd\\u590d\\u53d1\\u9001\\u540c\\u6837\\u7684\\u5185\\u5bb9"}') {
                myConsole.warn('Fail to message by server chan because of duplicate message');
            } else {
                throw new Error(result.data.toString());
            }
        }
    } catch (err) {
        throw new Error('Fail to message by server chan: ' + err);
    }
}

async function byPushBear(msg, options) {
    try {
        const result = await urllib.request('https://pushbear.ftqq.com/sub', {
            method: 'GET',
            data: {
              'sendkey': options.key,
              'text': msg,
              'desp': msg
            }
        });
        const parsed = JSON.parse(result.data.toString());
        if (parsed.code !== 0) {
            if (parsed.message === 'database error -\u6ca1\u6709\u67e5\u8be2\u5230\u53ef\u7528\u7684OPENID') {
                myConsole.warn('Fail to message by push bear because nobody has subscribed');
            } else {
                throw new Error(result.data.toString());
            }
        }
    } catch (err) {
        throw new Error('Fail to message by push bear: ' + err);
    }
}

async function message(msg, channel) {
    try {
        if (typeof options.channels[channel] === 'undefined') throw new Error('Channel not exist');
        const channelOptions = options.channels[channel];
        if (channelOptions.type === 'serverChan') {
            await byServerChan(msg, channelOptions);
        } else if (channelOptions.type === 'pushBear') {
            await byPushBear(msg, channelOptions);
        } else {
            throw new Error('Channel type not supported');
        }
    } catch (err) {
        const error = new Error('Fail to message: ' + err);
        myConsole.error(error.message);
        throw error;
    }
}

module.exports = message;
