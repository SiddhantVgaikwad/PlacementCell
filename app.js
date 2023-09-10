//import module
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

//import file
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const routes = require('./routes')


const port = process.env.PORT || 8001;
dotenv.config({ path: 'config/.env' });



// ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//session 
app.use(
	session({
		secret: "deadpool", // SECRET is stored in the system veriable
		resave: false,//if the session data is alredy stored we dont need to rewrite it again and again so this is set to false
		//when the user is not logged in or identity is not establish in that case we dont need to save extra data in
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 100 },
	})
);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// express router
app.use('/', routes);



// listen on port
app.listen(port, () =>{
	console.log(`server is running on port : ${port}`)
})
