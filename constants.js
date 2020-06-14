'use strict';
require('dotenv-defaults').config()

module.exports = {
    MONGO_CONNECTING_STRING: process.env.MONGO_CONNECTING_STRING,
    DEFAULT_SUPER_ADMIN: process.env.DEFAULT_SUPER_ADMIN,
    DEFAULT_SUPER_ADMIN_PASSWORD: process.env.DEFAULT_SUPER_ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
    
    STRIPE: {
        PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
        PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY
    }
}