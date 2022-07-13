const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connect to DB

        this.connectDB();

        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors())

        // Read and parse body

        this.app.use( express.json() );

        // public directory

        this.app.use( express.static('public'));

    };

    routes() {

        this.app.use(this.usersPath, require('../routes/users'))
        
    };

    listen()  {
        this.app.listen(  this.port, () => {
            console.log('Server running in port:', this.port );
        });
    }
    

}


module.exports = Server;