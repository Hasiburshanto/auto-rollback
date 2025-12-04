const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const logFilePath = path.join(__dirname, 'logs', 'app.log');

// Ensure logs folder exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath));
}

// Function to write logs
function writeLog(type, message) {
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} [${type.toUpperCase()}] ${message}\n`;
    fs.appendFileSync(logFilePath, logLine);
    console.log(logLine.trim());
}

app.get('/ok', (req, res) => {
    writeLog('info', 'Normal request handled successfully');
    res.json({ status: 'ok', message: 'Everything is good' });
});

app.get('/error', (req, res) => {
    writeLog('error', 'Intentional error triggered');
    res.status(500).json({ status: 'error', message: 'Intentional error logged' });
});

app.listen(PORT, () => {
    writeLog('info', `Server started on port ${PORT}`);
});

