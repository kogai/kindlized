var express = require('express');
var router = express.Router();
var MongoDB = require('../models/mongodef');

router.get('/', function(req, res) {
    MongoDB.User.update(
        { "uuid" : req.query.id },
        {
            "is_verify" : "VERIFIED"
        },
        function( err , numberAffected , raw ){
            if(err) console.log(err);
        }
    );

    console.log('mail verification is success');
    res.redirect( 303, '/login');
});

module.exports = router;