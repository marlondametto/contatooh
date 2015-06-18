//config/express.js
var helmet = require('helmet');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var express = require('express');

module.exports = function(){
    var app = express();
    
    //variável de ambiente
    app.set('port', 3000);

    // middleware    
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    // novos middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser());
    app.use(session(
        { 
            secret: 'homem avestruz',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.disable('x-powered-by');
    app.use(helmet.nosniff());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());

    load('models', {cwd: 'app'})
    	.then('controllers')
    	.then('routes')
    	.into(app);         
    // se nenhuma rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).render('404')
    });
    return app;
};