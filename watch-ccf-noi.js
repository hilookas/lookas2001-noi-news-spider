'use strict';

const EventEmitter = require('events');
const urllib = require('urllib');

const options = require('./options.js');
const myConsole = require('./my-console.js');

async function fetchList() {
    try {
        const result = await urllib.request('http://www.noi.cn/GetNews.dt?cmd=list&place=1&psize=20');
        const parsed = JSON.parse(result.data.toString());
        const list = {};
        for (let i = 0; i < parseInt(parsed.pagesize); ++i) {
            list['http://www.noi.cn/newsview.html?id=' + parsed[i].id + '&hash=' + parsed[i].hash] = JSON.stringify({
                title: parsed[i].title,
                hash: parsed[i].time + '|' + parsed[i].mtime + '|' + parsed[i].ptime
            });
        }
        return list;
    } catch (err) {
        throw new Error('Fail to fetch list from ccfNoi: ' + err);
    }
}

async function watch() {
    try {
        const eventEmitter = new EventEmitter();
        const originalList = await fetchList();
        setInterval(async () => {
            try {
                const list = await fetchList();
                for (let key in list) {
                    if (typeof originalList[key] === 'undefined') {
                        eventEmitter.emit('created', key, list[key]);
                        originalList[key] = list[key];
                    } else if (originalList[key] != list[key]) {
                        eventEmitter.emit('updated', key, list[key]);
                        originalList[key] = list[key];
                    }
                }
            } catch (err) {
                const error = new Error('Fail to update list form ccfNoi: ' + err);
                myConsole.error(error.message);
            }
        }, options.ccfNoi.interval);
        return eventEmitter;
    } catch (err) {
        const error = new Error('Fail to init watcher for ccfNoi: ' + err);
        myConsole.error(error.message);
        throw error;
    }
}

module.exports = watch;
