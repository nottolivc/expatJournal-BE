
const express = require('express');
const aws = require('aws-sdk');
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

// express will serve up production assets
// like main.js file, or main.css file
// server.use(express.static('client/build'));

// express will serve up the index.html file
// if it doesn't recognize the route
// const path = require('path');
// server.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

// CODE BELOW IS FOR UPLOADING TO AWS S3 - SHOULD BE MOVED TO AN API ROUTE EVENTUALLY 

aws.config.region = 'us-east-1';

const S3_BUCKET = "stachowitz-expat-journal"

server.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

// CODE ABOVE IS FOR UPLOADING TO AWS S3 - SHOULD BE MOVED TO AN API ROUTE EVENTUALLY 


server.use('/api', apiRoute);

module.exports = server;