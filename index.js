'use strict';

const options = require('./options.js');
const myConsole = require('./my-console.js');
const message = require('./message.js');
const watchCcfNoi = require('./watch-ccf-noi.js');
const watchTjqsnkjfwpt = require('./watch-tjqsnkjfwpt.js');

async function ccfNoiCreatedHandler(id, data) {
    try {
        const msg = 'CCF NOI 官网 创建了文章《' + JSON.parse(data).title + '》 ' + id;
        myConsole.log(msg);
        await message(msg, 1);
    } catch (err) {
        const error = new Error('Fail to send created notice from ccfNoi: ' + err);
        myConsole.error(error.message);
    }
}

async function ccfNoiUpdatedHandler(id, data) {
    try {
        const msg = 'CCF NOI 官网 更新了文章《' + JSON.parse(data).title + '》 ' + id;
        myConsole.log(msg);
        await message(msg, 1);
    } catch (err) {
        const error = new Error('Fail to send updated notice from ccfNoi: ' + err);
        myConsole.error(error.message);
    }
}

async function tjqsnkjfwptCreatedHandler(id, data) {
    try {
        const msg = '天津青少年科技创新活动服务平台 创建了文章《' + JSON.parse(data).title + '》 ' + id;
        myConsole.log(msg);
        await message(msg, 2);
    } catch (err) {
        const error = new Error('Fail to send created notice from tjqsnkjfwpt: ' + err);
        myConsole.error(error.message);
    }
}

async function tjqsnkjfwptUpdatedHandler(id, data) {
    try {
        const msg = '天津青少年科技创新活动服务平台 更新了文章《' + JSON.parse(data).title + '》 ' + id;
        myConsole.log(msg);
        await message(msg, 2);
    } catch (err) {
        const error = new Error('Fail to send updated notice from tjqsnkjfwpt: ' + err);
        myConsole.error(error.message);
    }
}

async function main() {
    try {
        myConsole.info('Spider initing');

        const ccfNoiEventEmitter = await watchCcfNoi();
        ccfNoiEventEmitter.on('created', ccfNoiCreatedHandler);
        ccfNoiEventEmitter.on('updated', ccfNoiUpdatedHandler);

        const tjqsnkjfwptEventEmitter = await watchTjqsnkjfwpt();
        tjqsnkjfwptEventEmitter.on('created', tjqsnkjfwptCreatedHandler);
        tjqsnkjfwptEventEmitter.on('updated', tjqsnkjfwptUpdatedHandler);

        myConsole.info('Spider started');

        // 保活
        await message('Spider started' + Math.random(), 0);
        setInterval(async () => { await message('Spider running' + Math.random(), 0); }, 24 * 60 * 60 * 1000);
    } catch (err) {
        const error = new Error('Fail to init: ' + err);
        myConsole.error(error.message);
        process.exit();
    }
}

main();
