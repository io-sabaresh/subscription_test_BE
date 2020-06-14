'use strict';
const express = require("express");
const router = express.Router();
const { createNewUser, userLogin, fetchUserDetails } = require('../api/users');

router.post('/signup/:userType', createNewUser);
router.post('/login', userLogin);
router.get('/email/:email', fetchUserDetails);

module.exports = router;