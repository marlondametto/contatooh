var config = require('./app/config/config')();
var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
require('./app/config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + 
		app.get('port'));
});
	