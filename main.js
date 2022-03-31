const Server = require('./core/Server');
const express = require("express");
const { engine } = require("express-handlebars");

const server = new Server();

server.app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts',
}));
server.app.set('view engine', 'handlebars');
server.app.set('views', './views');

server.app.use(express.static(__dirname + '/public'));

server.app.get('/', function(req, res) {
    res.render('home', { layout: 'index' })
});

server.listen();