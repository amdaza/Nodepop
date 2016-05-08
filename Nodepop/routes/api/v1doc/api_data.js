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
            "description": "<p>Advertisement tags filter.</p>"
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
            "description": "<p>Price range filter with format: ¡'min-max'. 'min-' and '-max' are also accepted.</p>"
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
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rows.",
            "description": ""
          }
        ]
      }
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
