const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:`{VALUE} is not a valid Email`
        }
    },
    password:{
        type:String,
        trim:true,
        minlength:5,

    },
    tokens: [{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})

module.exports={User};