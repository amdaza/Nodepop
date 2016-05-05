# Nodepop

## API de venta de artículos de segunda mano

Software que se ejecutará en el servidor dando servicio a una app (API) de venta de artículos de segunda mano

* [Descripción](#descripción)
* [Uso](#uso)
* [Ejemplos de peticiones y respuestas](#ejemplos-de-peticiones-y-respuestas)

## Descripción

## Uso

### Iniciar MongoDB

Lanzar desde la raíz del proyecto:

* Desde UNIX, ejecute /scripts/startMongo.sh
* Desde Windows, ejecute /scripts/startMongo.bat
* Si desea usar la consola de comandos directamente ejecute, desde /Nodepop:

        mongod --dbpath ../data/db --directoryperdb

### Arranque

Lanzar desde la raíz del proyecto:

    npm start

### Iniciar base de datos

Incluir primeros datos de ejemplo y para pruebas.
Desde la carpeta scripts, ejacutar

        node insertDefaultData.js

### Incluir primeros datos por defecto

  - [POST /user/register](#post-userregister)
  - [POST /user/authenticate](#post-userauthenticate)
  - [GET /advertisements/](#get-advertisements)

  ### POST /user/register

  Ejemplo: http://localhost:3000/api/v1/users/register

  Ejemplo de petición

      {
          "name": "Cristina",
          "email": "cris@tina.com",
          "pass": "123"
      }

  Ejemplo de respuesta:

  STATUS: 200

      {
          "success": true,
          "user": {
              "__v": 0,
              "name": "Cristina",
              "email": "cris@tina.com",
              "password": "123",
              "_id": "57293d3566cd6354042f3d71"
          }
      }

  Ejemplo de respuesta cuando el email ya existe:

  STATUS: 401

      {
          "success": true,
          "user": {
              "__v": 0,
              "name": "Cristina",
              "email": "cris@tina.com",
              "password": "123",
              "_id": "57293d3566cd6354042f3d71"
          }
      }

  ### POST /user/authenticate

  Ejemplo: http://localhost:3000/api/v1/users/authenticate

  Ejemplo de petición

       {
            "email": "cris@tina.com",
            "pass": "123"
        }

  Ejemplo de respuesta:

      {
          "success": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

  Ejemplo de respuesta si el usuario no existe

  STATUS: 401

      {
        "success": false,
        "error": "Authentication failed, no user found with that email."
      }

  Ejemplo de respuesta si la contraseña es incorrecta

  STATUS: 401

      {
        "success": false,
        "error": "Authentication failed, invalid password."
      }

  ### GET /advertisements

  Ejemplo: http://localhost:3000/api/v1/advertisements

  Ejemplo de petición:

      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MjkyYzQ4MDllMzM5OTgwMzFjOTFmOCIsImlhdCI6MTQ2MjMxNjc2NywiZXhwIjoxNDYyNDg5NTY3fQ.lC0qjHn-qw63XNovu2h63rA2Bfwq0I05RSHDT02xNWg"
      }

  Ejemplo de respuesta

  STATUS: 200

        {
            "success": true,
            "rows": [
                {
                    "_id": "572934f2b56205e4135132a0",
                    "name": "Bicicleta",
                    "forSale": true,
                    "price": 230.15,
                    "picture": "bici.jpg",
                    "tags": [
                        "lifestyle",
                        "motor"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a1",
                    "name": "iPhone 3GS",
                    "forSale": false,
                    "price": 50,
                    "picture": "iphone.png",
                    "tags": [
                        "lifestyle",
                        "mobile"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a2",
                    "name": "Collar multicolor",
                    "forSale": true,
                    "price": 3.5,
                    "picture": "collar.png",
                    "tags": [
                        "lifestyle"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a3",
                    "name": "Gafas",
                    "forSale": false,
                    "price": 45,
                    "picture": "gafas.png",
                    "tags": [
                        "lifestyle",
                        "work"
                    ]
                },
                {
                    "_id": "572934f2b56205e4135132a4",
                    "name": "Frikada",
                    "forSale": false,
                    "price": 10,
                    "picture": "frikada.png",
                    "tags": [
                        "lifestyle"
                    ]
                }
            ]
        }

  Ejemplo de respuesta cuando no se ha recibido token:

  STATUS: 401

      {
          "ok": false,
          "error": {
              "code": 403,
              "message": "No token provided."
          }
      }