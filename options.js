'use strict';

const secrets = require('./secrets.js');

module.exports = {
    ccfNoi: {
        interval: 600000
    },
    tjqsnkjfwpt: {
        interval: 600000
    },
    channels: [
        {
            type: 'serverChan',
            key: secrets.serverChanKey
        },
        {
            type: 'pushBear',
            key: secrets.pushBearKey1
        },
        {
            type: 'pushBear',
            key: secrets.pushBearKey2
        }
    ]
};
