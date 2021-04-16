var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/users');


router.use(bodyParser.json());

// router.post('/login', passport.authenticate('local'), (req, res) => {

//   var token = authenticate.getToken({_id: req.user._id});
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({success: true, token: token, status: 'You are successfully logged in!'});
// });



module.exports = router;
