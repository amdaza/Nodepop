/**
 * Created by Alicia on 08/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

// Response schema
var apiResponse = require('../../../lib/apiResponse');
// Error schema
var apiError = require('../../../lib/apiError');

// Languages
var langTexts = {
    es: require('../../../lib/languages/lang_ES'),
    en: require('../../../lib/languages/lang_EN')
};

// JWT Auth
var jwtAuth = require('../../../lib/jwtAuth');

router.use(jwtAuth());

/**
 * @api {get} /images/advertisements/:imageName Get Image
 * @apiVersion 1.0.0
 * @apiDescription Get advertisement image
 * @apiName GetAdvertisementImage
 * @apiGroup Images
 *
 * @apiParam {String} imageName Advertisement image name (including extension).
 *
 * @apiSuccess {image} advertisement image.
 */
router.get('/advertisements/:imageName', function (req, res, next) {
    var fs = require('fs');
    var imgPath = 'public/images/';
    var imageName = req.params.imageName;
    fs.readFile(imgPath + imageName, function (err, data) {
        if (err){
            return next(err); // Fail if the file can't be read.
        }

        var extension = imageName.split('.').pop();

        res.writeHead(200, {'Content-Type': 'image/' + extension});
        res.end(data); // Send the file data to the browser.
    });
});
module.exports = router;