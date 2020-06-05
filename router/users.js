'use strict';
const express = require("express");
const router = express.Router();
const { userLogin, fetchUserDetails } = require('../api/users');

router.post('/', userLogin);
router.get('/user', fetchUserDetails);

module.exports = router;