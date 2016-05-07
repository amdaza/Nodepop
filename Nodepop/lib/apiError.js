'use strict';

// Error structure
module.exports = function apiError(code, message, error, name, extra) {
   // console.log('apiError', code, message, error);
    var result = {};
    var errorCode = code || error.message || 401;
    var errorMessage = message || error.message || 'Error with no message';

   // console.log('errorMessage',errorMessage);

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
   // console.log('result.message',result.message);
    return result;
};