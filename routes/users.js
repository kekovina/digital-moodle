var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/users');

const Bot = require('node-telegram-bot-api');
const token = '1713251055:AAHR8KRvOuyx4Z3vQq_5ELvdy8kDcPEzkkg';

const bot = new Bot(token, {polling: true});


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



bot.onText(/\/start/, function (msg, match) {
  let chatId= msg.chat.id;
  let username = msg.from.username;

  
  User.find({login: username}).then((res)=>{
    if(res[0] != undefined){
      if(res[0].pin == 0){
        bot.sendMessage(chatId, '⚠️Вы уже авторизованы');
      }
      
    }

    if(res[0] != undefined) {
      if(res[0].pin != 0) {
        bot.sendMessage(chatId, `Ваш пин-код: ${res[0].pin}`);
      }
    }

    if(res[0] == undefined) {
      bot.sendMessage(chatId,'❌Вы не зарегистрированы')
    }
  })

});


module.exports = router;
