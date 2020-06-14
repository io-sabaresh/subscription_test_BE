const { errorHandler } = require("../errors/errorhandlers");
const { UNAUTHORIZED, FORBIDDEN } = require("http-status-codes");
const { COOKIE_NAME } = require("../constants");
const { isNullOrUndefined, verifyJWT } = require('../utilities/utils');

const isAdmin = async (req, res, next) => {
    try {
        if (isNullOrUndefined(req.cookies) || isNullOrUndefined(req.cookies[COOKIE_NAME])) throw { code: UNAUTHORIZED, message: `Unauthorized` };

        const user = verifyJWT(req.cookies[COOKIE_NAME]);
        
        if (user.userType !== `shop-owner`) throw { code: FORBIDDEN, message: `User is forbidden to this section` };

        req.user = user;

        next();
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports = isAdmin;