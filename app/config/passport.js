// app/config/passport.js
var config = require('./config')();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {

	passport.use(new GitHubStrategy({
		//clientID: 'ce6ccde11902e0f316d2',
		//clientSecret: '26768ca7c2be5236df708ab27d8677c0014295ed',
		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callBackURL: 'http://localhost:3000/auth/github/callback'		
	}, function(accessToken, refreshToken, profile, done) {

	}))	
};

var mongoose = require('mongoose');

module.exports = function() {
	var Usuario = 
		mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		//clientID: 'ce6ccde11902e0f316d2',
		//clientSecret: '26768ca7c2be5236df708ab27d8677c0014295ed',
		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callBackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{"login": profile.username},
			{"nome": profile.username},
			function(erro, usuario) {
				if(erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);
	}));

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});
	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});
};