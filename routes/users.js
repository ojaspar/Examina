
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check')
const express = require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
var router = express.Router();
var app = express();
const _ = require('lodash');
const mongoose = require('../db/mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var {User} = require('../models/user');
router.use(expressValidator());

router.get('/login', (req, res) =>{
    res.render('login')
});
router.get('/register',(req, res) =>{
    res.render('register')
});

router.get('/', (req, res) =>{
    res.render('index')
});

router.post('/register',(req, res) =>{
    var body = _.pick(req.body,['email', 'password']);
    var user = new User(body)
    user.save().then((user) =>{
        res.send(user);
    }).catch((e) =>{
        res.status(400).send()
    });
    console.log(req.body);


    res.location('/');
    res.redirect('/');
});
module.exports= router;