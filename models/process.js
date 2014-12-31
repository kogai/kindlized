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

var logout = require('../models/process/logout');
var author = require('../models/process/author');

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

router.post('/logout/', logout);
router.post('/author/', author );

module.exports = router;