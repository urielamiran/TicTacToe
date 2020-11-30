var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var init = require('./passport-config')
var passport = require('passport')
var app = express()
var cors = require('cors');

var corsMiddleware = cors({ origin: "http://localhost:4200", credentials: true });
app.use(corsMiddleware);

var sessionMiddleware = session({
	key: 'a_key',
	secret: 'a string',
	saveUninitialized: false,
	resave: true,
	store: new MongoStore({ url: 'mongodb://localhost/tictactoe' }),
	cookie: {
		maxAge: 86400000, 
		rolling: true
	}
});
var passInit = passport.initialize();
var passSession = passport.session();

init(passport);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionMiddleware, passInit, passSession);

app.use('/users', require('./routes/users'));

module.exports = app
