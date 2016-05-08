'use strict';

// Error structure
module.exports = function apiError(code, message, error, name, extra) {

    var result = {};
    var errorCode = code || error.message || 401;
    var errorMessage = message || error.message || 'Error with no message';

    result.code = errorCode;
    result.message = errorMessage;

    if (name !== undefined){
        result.name = name;
    }

    if (error !== undefined){
        result.error = error;
    }

    if (extra !== undefined){
        result.extra = extra;
    }

    return result;
};