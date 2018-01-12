const express = require('express');
const path = require('path');
const cookieParser =require('cookie-parser')
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const hbs = require('hbs');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash');

var {mongoose} = require('./db/mongoose');;

var router = express.Router();
var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var users = require('./routes/users')
app.use('/users', users);

// using a middleware
app.use(express.static(__dirname + '/public')); 
// handling sessions
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));
// handling passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) =>{
    res.locals.messages = require('express-messages')(req,res)
    next();
})
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

app.get('/', (req,res) =>{
    res.render('index.hbs',{
        pageTitle: 'Home || Examina'
    })
});

app.get('/login', (req, res) =>{
    res.render('login.hbs',{
        pageTitle:'Login || Examina'
    })
});
app.get('/register', (req, res) =>{
    res.render('register.hbs')
});


app.listen(3000,() =>{
    console.log('Server is up');
});
module.exports={app}