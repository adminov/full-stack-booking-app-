const Router = require('express');
const router = new Router();

const authRoute = require('./auth');
const hotelsRoute = require('./hotels');
const roomsRoute = require('./rooms');
const usersRoute = require('./users');


router.use('/auth', authRoute);
router.use('/hotels', hotelsRoute);
router.use('/rooms', roomsRoute);
router.use('/users', usersRoute);

module.exports = router;