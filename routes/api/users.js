const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../data/db.js')
const secrets = require('../../auth/secrets.js');
const { authenticate } = require('../../auth/authentication.js');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res
                    .status(200)
                    .json({
                        message: `Welcome ${user.username}!`,
                        token,
                    });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/jokes', authenticate, (req, res) => {
    const requestOptions = {
        headers: { accept: 'application/json' },
    };

    axios
        .get('https://icanhazdadjoke.com/search', requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error Fetching Jokes', error: err });
        });
});

function generateToken(user) {
    const payload = {
        subject: user.id, //standard claim
        username: user.username,
        roles: ['student']
    };
    const options = {
        expiresIn: '8h',
    };
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
