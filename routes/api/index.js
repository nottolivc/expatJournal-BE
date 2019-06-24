const express = require('express');
const router = express.Router();
const usersRoute = require('./users.js');
const storiesRoute = require('./stories.js');

router.use('/users', usersRoute);
router.use('/stories', storiesRoute);

module.exports = router;
