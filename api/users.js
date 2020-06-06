'use strict';
const { isNull } = require('lodash');
const { createNewUser: createUserService, getUserByEmail } = require('../database/services/userServices');
const { BAD_REQUEST, OK, CREATED, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const createNewUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.firstName) return res.status(BAD_REQUEST).json({ success: false, message: `Request constains insuffecient data!` })

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
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });
    }
}

const userLogin = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            const user = await getUserByEmail(req.body.email, "email +password");

            if (isNull(user)) res.status(NOT_FOUND).json({ success: false, message: `User Not Found!` });

            else if (user.password != req.body.password) res.status(UNAUTHORIZED).json({ success: false, message: `Password Incorrect!` });

            else res.status(OK).json({ success: true, message: { email: user.email } });
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: `Request contains insuffecient data` });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });
    }
}

const fetchUserDetails = async (req, res) => {
    try {
        if (req.params.email) {
            const user = await getUserByEmail(req.params.email);

            if (isNull(user)) res.status(NOT_FOUND).json({ success: false, message: `User Not Found!` });

            else res.status(OK).json({ success: true, message: { email: user.email, firstName: user.firstName, userType: user.userType } });
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: `Request contains insuffecient data` });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });
    }
}

module.exports = {
    createNewUser,
    userLogin,
    fetchUserDetails
}