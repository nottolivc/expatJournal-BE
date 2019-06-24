
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRoute = require('../routes/api/index.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());


server.get('/', (req, res) => {
    res.send(`
    <h1>Working...</h1>
    `);
});

server.use('/api', apiRoute);

module.exports = server;