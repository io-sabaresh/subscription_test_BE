'use strict';
const { isNull } = require('lodash');
const { createNewUser: createUserService, getUserByEmail } = require('../database/services/userServices');
const { BAD_REQUEST, OK, CREATED, UNAUTHORIZED, NOT_FOUND } = require('http-status-codes');
const { errorHandler } = require('../errors/errorhandlers');
const { signJWT } = require('../utilities/utils');
const { COOKIE_NAME } = require('../constants');

const createNewUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.firstName) throw ({ code: BAD_REQUEST, message: `Request constains insuffecient data!` });

        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName ? req.body.lastName : null,
            email: req.body.email,
            password: req.body.password,
            userType: req.params.userType
        }

        await createUserService(newUser);

        res.status(CREATED).json({ success: true, message: `User Created!` });
    } catch (error) {
        errorHandler(res, error);
    }
}

const userLogin = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            const user = await getUserByEmail(req.body.email, "email userType +password");

            if (isNull(user)) throw { code: NOT_FOUND, message: `User Not Found!` };

            else if (user.password != req.body.password) throw { code: UNAUTHORIZED, message: `Password Incorrect!` };

            else {
                const jwt = signJWT({ id: user._id, email: user.email, userType: user.userType });

                console.log("JWT: ", jwt);
                res.cookie(COOKIE_NAME, jwt, { maxAge: 600000000, httpOnly: true })
                    .status(OK).json({ success: true, message: { email: user.email } });
            }
        } else {
            throw { code: BAD_REQUEST, message: `Request contains insuffecient data` };
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

const fetchUserDetails = async (req, res) => {
    try {

        console.log("req.user : ", req.user);
        if (req.params.email) {
            const user = await getUserByEmail(req.params.email);

            if (isNull(user)) throw { code: NOT_FOUND, message: `User Not Found!` };

            else res.status(OK).json({ success: true, message: { email: user.email, firstName: user.firstName, userType: user.userType, _id: user._id } });
        } else {
            throw { code: BAD_REQUEST, message: `Request contains insuffecient data` };
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports = {
    createNewUser,
    userLogin,
    fetchUserDetails
}