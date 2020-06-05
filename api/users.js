'use strict';
const { isNull } = require('lodash');
const { getUserByEmail } = require('../database/services/userServices');
const { BAD_REQUEST, OK, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const userLogin = async (req, res) => {
    try {
        if(req.body.email && req.body.password) {
            const user = await getUserByEmail(req.body.email);

            if(isNull(user)) res.status(NOT_FOUND).json({ success: false, message: `User Not Found!`});

            else if(user.password != req.body.password) res.status(UNAUTHORIZED).json({ success: false, message: `Password Incorrect!`});
            
            else res.status(OK).json({ success: true, message: { email: user.email }});
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: `Request contains insuffecient data`});
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });
    }
}

const fetchUserDetails = async(req, res) => {
    try {
        if(req.body.email) {
            const user = await getUserByEmail(req.body.email);

            if(isNull(user)) res.status(NOT_FOUND).json({ success: false, message: `User Not Found!`});
            
            else res.status(OK).json({ success: true, message: { email: user.email, firstName: user.firstName, userType: user.userType }});
        } else {
            res.status(BAD_REQUEST).json({ success: false, message: `Request contains insuffecient data`});
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });
    }
}


module.exports = {
    userLogin,
    fetchUserDetails
}