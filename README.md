# Nodepop

## API de venta de artículos de segunda mano

Software que se ejecutará en el servidor dando servicio a una app (API) de venta de artículos de segunda mano

* [Descripción](#descripción)
* [Uso](#uso)
* [Ejemplos de peticiones y respuestas](#ejemplos-de-peticiones-y-respuestas)

## Descripción

## Uso

Antes de comenzar, indicarle que la raíz del proyecto se encuentra dentro de la carpeta 'Nodepop'. Por tanto, para comenzar cualquier operación deberá situarse en dicha carpeta:

    cd Nodepop

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
  - [POST /pushtoken](#post-pushtoken)

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

### POST /user/register

Ejemplo: http://localhost:3000/api/v1/pushtoken

Ejemplo de petición sin usuario:

    {
        "platform": "ios",
        "token": "iosToken"
    }

Ejemplo de respuesta:

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "_id": "572e1f7ead341de825fc7f46"
        }
    }

Ejemplo de petición con _id de usuario:

    {
        "platform": "ios",
        "token": "iosToken"
        "user": "572d1ccddb794a84154a16d9"
    }

Ejemplo de respuesta:

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "user": "572d1ccddb794a84154a16d9",
            "_id": "572e200cad341de825fc7f48"
        }
    }

Ejemplo de petición con email de usuario:

    {
        "platform": "ios",
        "token": "iosToken"
        "user": "572d1ccddb794a84154a16d9"
    }

Ejemplo de respuesta:

    {
        "success": true,
        "data": {
            "__v": 0,
            "platform": "ios",
            "token": "iosToken",
            "user": "572d1ccddb794a84154a16d9",
            "_id": "572e2031ad341de825fc7f49"
        }
    }