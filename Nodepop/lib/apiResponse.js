/**
 * Created by Alicia on 05/05/2016.
 */
'use strict';

module.exports = function apiResponse(res, success, data) {
    //console.log('apiResponse data', data);
    if (!success) { // Error
        return res.json({
            success: false,
            error: data
        });
    }

    // Success
    return res.json({
        success: true,
        data: data
    });
};