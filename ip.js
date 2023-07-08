'use strict';
const { networkInterfaces } = require('os');

const interfaces = networkInterfaces();
const results = Object.create(null);

const osType = process.platform;

// Network interface names for different operating systems
const interfaceNames = {
    win32: ['Wi-Fi', 'Ethernet'],
    darwin: ['en0'],
    linux: ['eth0'],
};

const supportedInterfaces = interfaceNames[osType];

if (supportedInterfaces) {
    for (const name of Object.keys(interfaces)) {
        if (supportedInterfaces.some((interfaceName) => name.includes(interfaceName))) {
            for (const net of interfaces[name]) {
                const family = net.family === 'IPv4' ? 'IPv4' : 4;
                if (net.family === family && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
    }
}

const ans = supportedInterfaces ? results[supportedInterfaces[0]] || [] : [];
module.exports = ans.length > 0 ? ans[0] : 'localhost';
