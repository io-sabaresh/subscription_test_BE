const { INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { isNullOrUndefined } = require("../utilities/utils");

const errorHandler = async (res, error) => {
    try {
        console.log(" <== Error Handler Log ==> \n", error);
        if (isNullOrUndefined(error) || isNullOrUndefined(res)) throw 'Response/Error Object Missing';

        if (error.code && error.message) return res.status(error.code).json({ success: false, message: error.message });
        else return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error });

    } catch (error) {
        console.log("====> Error Happened inside error handler!! \n", error);
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: 'Contact help desk!' });
    }
}

module.exports = {
    errorHandler
}