const express = require('express');
const { engine } = require('express-handlebars');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.port = 8080;
        this.productsRoute = '/api/products';

        this.middlewares();
        this.routes();
        // this.views();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(this.productsRoute, require('../routes/product.routes'));
    }

    views() {
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', './views');
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on: http://localhost:${ this.port }`);
        })

        this.app.on('error', error => console.log(`Server error ${ error }`))
    }
}