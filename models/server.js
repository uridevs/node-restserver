const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            uploads:    '/api/uploads'
        }
        
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

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        // CORS
        this.app.use(cors())

        // Read and parse body

        this.app.use( express.json() );

        // public directory

        this.app.use( express.static('public'));

        

    };

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
        
    };

    listen()  {
        this.app.listen(  this.port, () => {
            console.log('Server running in port:', this.port );
        });
    }
    

}


module.exports = Server;