'use strict';
require('dotenv-defaults').config()

module.exports = {
    MONGO_CONNECTING_STRING: process.env.MONGO_CONNECTING_STRING,
    DEFAULT_SUPER_ADMIN: process.env.DEFAULT_SUPER_ADMIN,
    DEFAULT_SUPER_ADMIN_PASSWORD: process.env.DEFAULT_SUPER_ADMIN_PASSWORD
}