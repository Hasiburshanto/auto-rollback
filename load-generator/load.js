const axios = require('axios');

const TARGET_URL = process.env.TARGET_URL || 'http://host.docker.internal:3000'; // Docker: use host.docker.internal
const QPS = parseFloat(process.env.QPS || '5'); // requests per second
const DURATION_SEC = parseInt(process.env.DURATION_SEC || '600'); // run time in seconds
const ERROR_RATE = parseFloat(process.env.ERROR_RATE || '0.2'); // % of requests to /error

console.log(`Starting load generator: target=${TARGET_URL}, QPS=${QPS}, duration=${DURATION_SEC}s, errorRate=${ERROR_RATE}`);

let sent = 0;
const intervalMs = 1000 / QPS;
const stopAt = Date.now() + DURATION_SEC * 1000;

async function sendReq() {
    try {
        if (Math.random() < ERROR_RATE) {
            await axios.get(`${TARGET_URL}/error`);
        } else {
            await axios.get(`${TARGET_URL}/ok`);
        }
    } catch (e) {
        // ignore network errors
    }
    sent++;
}

(async function run() {
    while (Date.now() < stopAt) {
        sendReq();
        await new Promise(r => setTimeout(r, intervalMs));
    }
    console.log(`Load generator finished. Total requests sent: ${sent}`);
})();

