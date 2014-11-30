var express = require('express');
var router = express.Router();
var MongoDB = require('../models/db.user');
var mailer = require('../models/mailer');
var uuid = require('node-uuid');
var passportStrategy = require('../models/auth');
var passport = require('passport');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

passportStrategy

router.post('/regist/' , function( req , res ){
    
    var verify_id = uuid.v1();

    var newUser = new MongoDB.User({
        mail : req.body.mail,
        pwd : req.body.pwd,
        uuid : verify_id,
        is_verify : 'UNVERIFIED',
        is_seller : false,
    });
    // save to mongodb
    newUser.save(function(err){
        if(err){
            res.render( 'regist', {
                title : 'エラー',
                is_visible : 'show',
                caution : err.errors.mail.message
            });
        }else{
            console.log('regist is success');
            res.redirect( 303, '/login');
        }
    });
    var host = req.get('host');
    var link = "http://" + req.get('host') + "/verify?id=" + verify_id;
    var data = {
        mail : req.body.mail,
        pwd : req.body.pwd,
        link : link
    };
    mailer(data);
});

router.post('/login/',
    passport.authenticate(
        'local',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true 
        }
    )
);

router.post('/logout/' , function(req,res){
    delete req.session.passport.user;
    res.redirect( 303, '/login');
});

router.post('/upload/' , function( request , res ){
    // var form = new formidable.IncomingForm();
    var form = new formidable.IncomingForm();
        // form.encoding = "utf-8";
        // form.uploadDir = "./uploads/";
    console.log(form);
    form.parse( request , function( err , fields , files ) {
        console.log(request);
        console.log(err);
        console.log(fields);
        console.log(files);
    });
    console.log(form.parse);
    // form.onPart(req);
    res.redirect( 303, '/');
});

module.exports = router;