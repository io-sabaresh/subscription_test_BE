'use strict';
const express = require("express");
const app = express();
const router = express.Router();
const users = require('./users');

app.use('/users', users);

module.exports = app;