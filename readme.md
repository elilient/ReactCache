## This is a Node back-end setup using typescript with typeorm implementation.
### Required: XAMPP, POSTMAN
start MySQL and Apache servers in XAMPP

### Database configuration

Clone/download this repo.

Create a new database and username(all permissions) in phpMyAdmin
    
    http://localhost/phpmyadmin/

    database name : APIdb
    username: admin
    password: admin

Edit NodeBE/ormconfig.json to your MySQL username and password

    "username": "admin",
    "password": "admin",
    "database": "APIdb",

### Node start

Install dependencies in NodeBE

    npm install

Start the server.

    npm start
    
### Endpoints

User registration: user/register
    
    {
    	"username":"admin",
    	"password":"admin",
    	"role":"ADMIN"
    }
User login: /auth/login

    {
    	"username":"admin",
    	"password":"admin"
    }

Copy the token for user auth endpoints.

POST with token localhost:5000/documents/fill

This generates random data in the db. For our purposes we only need the IDs 1-5.

POST with token localhost:5000/documents/favorite

    {
    	"documentID":"1",
    	"userID":"1"
    }

This adds the document with the ID 1 to the favorites list.
On the front-end if you check http://localhost:3000/listing it should show the ID
    
    im a listing view
    1
    
Add another ID to the favorites.

    {
        "documentID":"2",
        "userID":"1"
    }
    
Refresh the page and the ID of second document will appear after a delay.

### delay conf

Delay is set in src/modules/documents/controller.ts under public listFavorites

    setTimeout(() => {
                res.send(items);
            }, 2500);



