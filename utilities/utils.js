const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants");
const { UNAUTHORIZED } = require('http-status-codes');
const { isNull, isUndefined } = require('lodash');

const signJWT = (data = {}) => {
    try {
        const payload = { ...data, iat: new Date().getTime() };
        return jwt.sign(payload, JWT_SECRET);
    } catch (error) {
        throw error;
    }
}

const verifyJWT = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        if (error && (error.name === "TokenExpiredError"
            || error.name === "JsonWebTokenError" || error.name === "NotBeforeError")) {
            throw { success: false, code: UNAUTHORIZED }
        } else {
            throw error;
        }

    }
}

const isNullOrUndefined = (obj) => {
    try {
        return (isNull(obj) || isUndefined(obj)) ? true : false;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    signJWT,
    verifyJWT,
    isNullOrUndefined
}