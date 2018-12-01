'use strict';

const EventEmitter = require('events');
const urllib = require('urllib');
const { JSDOM } = require('jsdom');
const iconv = require('iconv-lite');

const options = require('./options.js');
const myConsole = require('./my-console.js');

async function fetchList() {
    try {
        const result = await urllib.request('http://tianjin.xiaoxiaotong.org/FileNotice/Lists/1');
        const $lis = (new JSDOM(iconv.decode(result.data, 'gb2312'))).window.document.querySelectorAll('#listArea > ul > li');
        const list = {};
        for (const $li of $lis) {
            const $a = $li.querySelector('a');
            const $span = $li.querySelector('span');
            
            list['http://tianjin.xiaoxiaotong.org' + $a.getAttribute('href')] = JSON.stringify({
                title: $a.innerHTML,
                hash: $span.innerHTML
            });
        }
        return list;
    } catch (err) {
        throw new Error('Fail to fetchList list from tjqsnkjfwpt: ' + err);
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
                const error = new Error('Fail to update list form tjqsnkjfwpt: ' + err);
                myConsole.error(error.message);
            }
        }, options.tjqsnkjfwpt.interval);
        return eventEmitter;
    } catch (err) {
        const error = new Error('Fail to init watcher for tjqsnkjfwpt: ' + err);
        myConsole.error(error.message);
        throw error;
    }
}

module.exports = watch;
