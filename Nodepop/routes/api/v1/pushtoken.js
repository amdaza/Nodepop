/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('Pushtoken');
var User = mongoose.model('User');

// Response schema
var apiResponse = require('../../../lib/apiResponse');
// Error schema
var apiError = require('../../../lib/apiError');

// Languages
var langTexts = {
    es: require('../../../lib/languages/lang_ES'),
    en: require('../../../lib/languages/lang_EN')
};


/**
 * APIDOC DOCUMENTATION
 *
 * @api {POST} /pushtoken Save Push Token
 * @apiVersion 1.0.0
 * @apiName SavePushToken 
 * @apiDescription Save iOS or Android push token. It could be associated to a user
 * @apiGroup PushToken
 *
 * @apiParam {String} platform Device platform.
 * @apiParam {String} token iOS or Android push token.
 * @apiParam {String} [user] [Optional] User _id or email.
 *
 * @apiParamExample {String} platform
 *      android
 * @apiParamExample {String} token
 *      654C4DA3-3F58-49B9-8EA2-80EA29B46EB0
 * @apiParamExample {String} user
 *      pe@pa.com
 *
 * @apiSuccess (200 Success) {boolean} success true.
 * @apiSuccess (200 Success) {json} data json with authenticate information (token).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "success": true,
 *           "data": {
 *               "pushtoken": {
 *                   "__v": 0,
 *                   "platform": "android",
 *                   "token": "654C4DA3-3F58-49B9-8EA2-80EA29B46EB0",
 *                   "user": "572f4e334e8f8d002d095fef",
 *                   "_id": "572f5a215ef76d9412febf82"
 *               }
 *           }
 *      }
 *
 *
 * @apiError (400 Bad Request) {boolean} success
 *      false.
 * @apiError (400 Bad Request) {json} error
 *      json with error information.
 *      ValidationError Error on new push token model validationd.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *           "success": false,
 *           "error": {
 *               "code": 3,
 *               "message": "Error on new push token model validation.",
 *               "name": "ValidationError",
 *               "error": {
 *                   "platform": {
 *                       "message": "`unvalidPlatform` is not a valid enum value for path `platform`.",
 *                       "name": "ValidatorError",
 *                       "properties": {
 *                           "enumValues": [
 *                               "ios",
 *                               "android"
 *                           ],
 *                           "type": "enum",
 *                           "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
 *                           "path": "platform",
 *                           "value": "unvalidPlatform"
 *                       },
 *                       "kind": "enum",
 *                       "path": "platform",
 *                       "value": "unvalidPlatform"
 *                   }
 *               }
 *           }
 *       }
 */
router.post('/', function (req, res) {
    var platform = req.body.platform;
    var token = req.body.token;
    var user = req.body.user;

    var data = {};
    if (platform !== undefined){
        data.platform = platform;
    }

    if (token !== undefined) {
        data.token = token;
    }

    var checkUserPromise = new Promise(function (resolve, reject){
        if (user !== undefined){
            // Search user by _id or email
            User.getUserId(user, function (err, row){
                if (err) {
                    var getUserError = apiError(
                        11, // code
                        langTexts[req.lang][11], // message
                        err, // generated error
                        'InvalidUser' // name
                    );
                    reject(getUserError);
                }
                // Include id user in data
                data.user = row;
                resolve();
            });

        } else {
            // No user, so we're done
            resolve();
        }
    });

    checkUserPromise.then( function () {
        var pushToken = new PushToken(data);

        var validateError = pushToken.validateSync();
        if (validateError){
            var err = apiError(
                3, // code
                langTexts[req.lang][3], // message
                validateError.errors, // generated error
                validateError.name // name
            );
            res.status(400);
            return apiResponse(res, false, err);
        }
        pushToken.save(function (err, saved) {
            if (err) { // Unknown error
                var serverError = apiError(
                    500, // code
                    undefined, // message
                    err, // generated error
                    'ServerError' // name
                );
                res.status(500);
                return apiResponse(res, false, serverError);
            }

            var returnData = {
                pushtoken: saved
            };
            return apiResponse(res, true, returnData);
        });

    }).catch (function (err){
        // Error on getting user
        res.status(400);
        return apiResponse(res, false, err);
    });
});

module.exports = router;