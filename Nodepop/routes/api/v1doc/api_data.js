define({ "api": [
  {
    "type": "get",
    "url": "/advertisements/",
    "title": "",
    "description": "<p>Get advertisements</p>",
    "name": "GetAdvertisements",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advertisement beginning name filter.</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "tags",
            "description": "<p>Advertisement tags filter. Valid tags: [&quot;work&quot;, &quot;lifestyle&quot;, &quot;motor&quot;, &quot;mobile&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "forSale",
            "description": "<p>filter. Casted to true when value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price range filter with format: 'minValue-maxValue'. 'minValue-' and '-maxValue' are also accepted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "includeTotal",
            "description": "<p>filter. Response will return elements count if value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start, for pagination.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit of elements to obtain.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Will sort elements by its value.</p>"
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
    "version": "0.0.0",
    "filename": "v1/advertisements.js",
    "groupTitle": "Advertisements"
  },
  {
    "type": "get",
    "url": "/images/advertisements/:imageName",
    "title": "",
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
    "version": "0.0.0",
    "filename": "v1/images.js",
    "groupTitle": "Images"
  }
] });
