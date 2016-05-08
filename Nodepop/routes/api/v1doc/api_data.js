define({ "api": [
  {
    "type": "GET",
    "url": "/advertisements/",
    "title": "Get Advertisements",
    "version": "1.0.0",
    "description": "<p>Get advertisements</p>",
    "name": "GetAdvertisements",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>[Optional] Advertisement beginning name filter.</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": true,
            "field": "tags",
            "description": "<p>[Optional] Advertisement tags filter. Valid tags: [&quot;work&quot;, &quot;lifestyle&quot;, &quot;motor&quot;, &quot;mobile&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "forSale",
            "description": "<p>[Optional] items for sale (or not) filter. Casted to true when value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "price",
            "description": "<p>[Optional] Price range filter with format: 'minValue-maxValue'. 'minValue-' and '-maxValue' are also accepted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "includeTotal",
            "description": "<p>[Optional] filter. Response will [return] [Optional] elements count if value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "start",
            "description": "<p>[Optional] , for pagination.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "limit",
            "description": "<p>[Optional] Limit of elements to obtain.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>[Optional] Will sort elements by its value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>rows with advertisements information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"rows\": [\n              {\n                  \"_id\": \"572d1ccddb794a84154a16dd\",\n                  \"name\": \"Bicicleta\",\n                  \"forSale\": true,\n                  \"price\": 230.15,\n                  \"picture\": \"bici.jpg\",\n                  \"tags\": [\n                      \"lifestyle\",\n                      \"motor\"\n                  ]\n              },\n              {\n                  \"_id\": \"572d1ccddb794a84154a16de\",\n                  \"name\": \"iPhone 3GS\",\n                  \"forSale\": false,\n                  \"price\": 50,\n                  \"picture\": \"iphone.png\",\n                  \"tags\": [\n                      \"lifestyle\",\n                      \"mobile\"\n                  ]\n              }\n          ]\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "QueryError",
            "description": "<p>Error trying to get advertisements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"success\": false,\n   \"error\": {\n       \"code\": 20,\n       \"message\": \"Error trying to get advertisements.\",\n       \"name\": \"QueryError\",\n       \"error\": {\n           \"message\": \"Cast to number failed for value \\\"garbage\\\" at path \\\"price\\\"\",\n           \"name\": \"CastError\",\n           \"kind\": \"number\",\n           \"value\": \"garbage\",\n           \"path\": \"price\"\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "v1/advertisements.js",
    "groupTitle": "Advertisements"
  },
  {
    "type": "GET",
    "url": "/advertisements/tagvalues",
    "title": "Get Advertisements Valid Tag Values",
    "version": "1.0.0",
    "description": "<p>Get advertisements valid tag values</p>",
    "name": "GetAdvertisementsValidTAgs",
    "group": "Advertisements",
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>array with possible tags</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": [\n         \"work\",\n         \"lifestyle\",\n         \"motor\",\n         \"mobile\"\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "v1/advertisements.js",
    "groupTitle": "Advertisements"
  },
  {
    "type": "get",
    "url": "/images/advertisements/:imageName",
    "title": "Get Image",
    "version": "1.0.0",
    "description": "<p>Get advertisement image</p>",
    "name": "GetAdvertisementImage",
    "group": "Images",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>Advertisement image name (including extension).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "image",
            "optional": false,
            "field": "advertisement",
            "description": "<p>image.</p>"
          }
        ]
      }
    },
    "filename": "v1/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "POST",
    "url": "/pushtoken",
    "title": "Save Push Token",
    "version": "1.0.0",
    "name": "SavePushToken",
    "description": "<p>Save iOS or Android push token. It could be associated to a user</p>",
    "group": "PushToken",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "platform",
            "description": "<p>Device platform.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>iOS or Android push token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "user",
            "description": "<p>[Optional] User _id or email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "platform",
          "content": "android",
          "type": "String"
        },
        {
          "title": "token",
          "content": "654C4DA3-3F58-49B9-8EA2-80EA29B46EB0",
          "type": "String"
        },
        {
          "title": "user",
          "content": "pe@pa.com",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>json with authenticate information (token).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"pushtoken\": {\n              \"__v\": 0,\n              \"platform\": \"android\",\n              \"token\": \"654C4DA3-3F58-49B9-8EA2-80EA29B46EB0\",\n              \"user\": \"572f4e334e8f8d002d095fef\",\n              \"_id\": \"572f5a215ef76d9412febf82\"\n          }\n      }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false.</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>json with error information. ValidationError Error on new push token model validationd.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n      \"success\": false,\n      \"error\": {\n          \"code\": 3,\n          \"message\": \"Error on new push token model validation.\",\n          \"name\": \"ValidationError\",\n          \"error\": {\n              \"platform\": {\n                  \"message\": \"`unvalidPlatform` is not a valid enum value for path `platform`.\",\n                  \"name\": \"ValidatorError\",\n                  \"properties\": {\n                      \"enumValues\": [\n                          \"ios\",\n                          \"android\"\n                      ],\n                      \"type\": \"enum\",\n                      \"message\": \"`{VALUE}` is not a valid enum value for path `{PATH}`.\",\n                      \"path\": \"platform\",\n                      \"value\": \"unvalidPlatform\"\n                  },\n                  \"kind\": \"enum\",\n                  \"path\": \"platform\",\n                  \"value\": \"unvalidPlatform\"\n              }\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "v1/pushtoken.js",
    "groupTitle": "PushToken"
  },
  {
    "type": "POST",
    "url": "/users/authenticate",
    "title": "Get User Token",
    "version": "1.0.0",
    "name": "GetUserToken",
    "description": "<p>Authenticate user. If user and password are correct, returns a token for API comunication.</p>",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>User password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "email",
          "content": "pe@pa.com",
          "type": "String"
        },
        {
          "title": "pass",
          "content": "123",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>json with authenticate information (token).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmY0ZTMzNGU4ZjhkMDAyZDA5NWZlZiIsImlhdCI6MTQ2MjcxOTIzOSwiZXhwIjoxNDYyODkyMDM5fQ.nN1ROfVLEFKXejwNNwKH2hY92ievZYamU7GC21sF4IE\"\n      }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false.</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>json with error information. UnvalidPass Authentication failed, invalid password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n      \"success\": false,\n      \"error\": {\n          \"code\": 13,\n          \"message\": \"Authentication failed, invalid password.\",\n          \"name\": \"UnvalidPass\",\n          \"error\": \"Authentication failed, invalid password.\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "v1/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "POST",
    "url": "/users/register",
    "title": "Register User",
    "version": "1.0.0",
    "description": "<p>Register new user</p>",
    "name": "RegisterUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email. If email already exists, will return an error.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>User password to later authentication.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "name",
          "content": "Pepa",
          "type": "String"
        },
        {
          "title": "email",
          "content": "pe@pa.com",
          "type": "String"
        },
        {
          "title": "name",
          "content": "123",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>json with user information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"user\": {\n              \"__v\": 0,\n              \"name\": \"Pepa\",\n              \"email\": \"pe@pa.com\",\n              \"password\": \"a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3\",\n              \"_id\": \"572f4e334e8f8d002d095fef\"\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false.</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>json with error information. DuplicatedEmail Cannot crate user, that email already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n      \"success\": false,\n      \"error\": {\n          \"code\": 10,\n          \"message\": \"Cannot crate user, that email already exist.\",\n          \"name\": \"DuplicatedEmail\",\n          \"error\": {\n              \"code\": 11000,\n              \"index\": 0,\n              \"errmsg\": \"E11000 duplicate key error collection: nodepop.users index: email_1 dup key: { : \\\"pe@pe.com\\\" }\",\n              \"op\": {\n                  \"name\": \"Pepe\",\n                  \"email\": \"pe@pe.com\",\n                  \"password\": \"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad\",\n                  \"_id\": \"572f4ded4bff3fe8197660a5\",\n                  \"__v\": 0\n              }\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "v1/users.js",
    "groupTitle": "Users"
  }
] });
