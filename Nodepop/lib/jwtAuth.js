'use strict';
/**
 * Your utility library for express
 */
var jwt = require('jsonwebtoken');
var configJWT = require('../local_config').jwt;

// Response schema
var apiResponse = require('./apiResponse');
// Error schema
var apiError = require('./apiError');

// Languages
var langTexts = {
    es: require('./languages/lang_ES'),
    en: require('./languages/lang_EN')
};

/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {
    return function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    //return res.json({ ok: false, error: {code: 401, message: 'Failed to authenticate token.'}});
                    var invalidTokenError = apiError(
                        14, // code
                        langTexts[req.lang][14], // message
                        err, // generated error
                        'JWTInvalidToken' // name
                    );
                    res.status(401);
                    return apiResponse(res, false, invalidTokenError);
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token return error
            /*
            return res.status(403).json({
                ok: false,
                error: { code: 403, message: 'No token provided.'}
            });
            */
            var invalidTokenError = apiError(
                15, // code
                langTexts[req.lang][15], // message
                undefined, // generated error
                'JWTMissingToken' // name
            );
            res.status(403);
            return apiResponse(res, false, invalidTokenError);
        }
    };
};
