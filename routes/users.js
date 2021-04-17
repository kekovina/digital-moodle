var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/users');
var Quiz = require('../models/quiz');




router.use(bodyParser.json());

router.post('/login', (req, res) => {
  User.find({login: req.body.login.substr(1)}).then(resp=>{
    if(resp[0] != undefined) {
      if(resp[0].pin == 0){

        res.statusCode = 200;
        res.json({auth: true});
      }
    } 
    if(resp[0] != undefined) {
      if(resp[0].pin != 0){
        if(req.body.pin == resp[0].pin){
          resp[0].pin = 0;
          resp[0].save().then(()=>{
            res.statusCode = 200;
            res.json({auth: true});
          })
        } else {
          res.statusCode = 400;
          res.json({err: "Pin-code doesnt match"})
        }
    }
    }
    if(resp[0] == undefined) {
      let random = (Math.random() * 10000).toFixed(0);

      User.create({login: req.body.login.substr(1), pin: random}).then(response=>{
        res.statusCode = 200;
        res.json({auth: 'pending'});
      })
    }
  })
});

router.get('/:login', (req,res)=>{
  let login  = req.params.login;

  User.find({login: login}).then(user=>{
    if(user[0] != undefined) {
      res.statusCode = 200;
      res.json(user[0]);
    } else {
      res.statusCode = 400;
      res.json({err: 'user doesnt exist'});
    }
  })
})

router.post('/money',(req,res)=>{
  User.find({login: req.body.login}).then(user=>{
    console.log(req.body.login)
    if(user[0] != undefined) {
      user[0].balance += req.body.amount;
      user[0].save(()=>{
        res.statusCode = 200;
        res.json({balance: user[0].balance});
      })
    } else {
      res.statusCode = 400;
      res.json({err: 'user doesnt exist'});
    }
  })
})

router.post('/quiz/create', (req,res)=>{
  let question = req.body.question;
  let answers = req.body.answers.split(',');
  let rightAnswer = req.body.right_answer;

  Quiz.create({question: question, answers: answers, right_answer: rightAnswer}).then(quiz=>{
    res.statusCode = 200;
    res.json(quiz)
  })
})







module.exports = router;
