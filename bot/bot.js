const Bot = require('node-telegram-bot-api');
const token = '1713251055:AAHR8KRvOuyx4Z3vQq_5ELvdy8kDcPEzkkg';

const bot = new Bot(token, {polling: true});

var User = require('../models/users');

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
          res[0].chat_id = chatId;
          res[0].save()
        }
      }
  
      if(res[0] == undefined) {
        bot.sendMessage(chatId,'❌Вы не зарегистрированы')
      }
    })
  
  });

  module.exports = bot;



