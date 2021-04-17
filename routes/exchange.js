var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var Exchange = require('../models/exchange');
var User = require('../models/users');
var func = require('../functions');
var bot = require('../bot/bot');
var Quiz = require('../models/quiz');
const exchange = require('../models/exchange');
const user = require('../../../fishingBot/models/user');


router.post('/create', (req,resp)=>{
    let from = req.body.from;
    let to = req.body.to;
    let artefact_from = req.body.artefact_from;
    let artefact_to = req.body.artefact_to;

    Exchange.create({from: from, to: to, artefact_from: artefact_from, artefact_to: artefact_to}).then(exchange=>{

        User.find({login:{$in:[from,to]}}).then(res=>{
            user1 = res[0];
            user2 = res[1];

            if(user1.login == to ){
                var user_to = user1
                var user_from = user2
            } else {
                var user_from = user1
                var user_to = user2
            }

            var from_artefact;

            user_from.artefacts.forEach((el,index)=>{
                if(el._id == artefact_from){
                    from_artefact = el.name;
                }
            })

            user_to.artefacts.forEach((el,index)=>{
                if(el._id == artefact_to){
                    bot.sendMessage(user_to.chat_id, `Сокурсник @${from} хочет обменять ${from_artefact} на ${el.name}. Ответьте на предложение.` )
                }
            })

            resp.statusCode = 200;
            resp.json({status: true,exchange: exchange});
        })
    
    });


})

router.post('/submit', (req,res)=>{
    let exchange_id = req.body.exchange_id;
    let accepter = req.body.login;

    Exchange.find({_id: exchange_id}).then(exchange=>{
        if(exchange[0].status != 'ended'){
        if(accepter == exchange[0].to){
            exchange[0].status = "answering";
                exchange[0].save().then(()=>{
                    let random = func.random(0,1);
                    
                    Quiz.find().then(resp=>{
                        let quiz = resp[random];

                        let question = quiz.question;
                        let answers = quiz.answers;
                        let right_answer = quiz.right_answer;

                        let keyboard = {
                            reply_markup: JSON.stringify({
                              inline_keyboard: [
                                [{ text: answers[0], callback_data: `${right_answer}:${exchange[0]._id}:0`} ,{ text: answers[1], callback_data:  `${right_answer}:${exchange[0]._id}:1`} ],
                                [{ text: answers[2], callback_data:  `${right_answer}:${exchange[0]._id}:2` }, { text: answers[3], callback_data:  `${right_answer}:${exchange[0]._id}:3` }]
                              ]
                            })
                          };

                          

                          User.find({login: accepter}).then(u=>{
                              let user = u[0];

                              bot.sendMessage(user.chat_id,question,keyboard);

                              User.find({login: exchange[0].from}).then(us=>{
                                  user = us[0];

                                  bot.sendMessage(user.chat_id,question,keyboard);
                              })

                              res.statusCode = 200;
                              res.json({status: "answering"})

                          })
                    })
                })
        }
    } else {
        res.statusCode = 400;
        res.json({err: "Up to date"})
    }
    })
})

    router.get('/:login', (req, res)=>{
        let login = req.params.login;

        Exchange.find({to: login, status: 'pending'}).then(ex=>{
            let exchange = ex[0]

            if(exchange == undefined){
                res.statusCode = 200;
                res.json({status: 'user doesnt have pending exchanges', exchange: {}})
            } else {
                res.statusCode = 200;
                res.json({status: true, exchange: exchange });
            }
        })
    })

    bot.on('callback_query',(msg)=>{
        
        var chatId = msg.from.id;
        var username = msg.from.username;

        var right_answer = msg.data.split(':')[0];
        var exchange_id = msg.data.split(':')[1];
        var answer = msg.data.split(':')[2];

        if(answer == right_answer){
            bot.sendMessage(chatId,'🥳Вы ответили верно!');
            Exchange.find({_id: exchange_id}).then(ex=>{
                let exchange = ex[0];
                if(exchange.status != 'ended'){
                    
                    if(username == exchange.from){

                        User.find({login: exchange.to}).then(u=>{
                            let user = u[0];
                            bot.sendMessage(user.chat_id, '🥳Ваш сокурсник ответил верно!');

                            exchange.answered_from = true;

                            if(exchange.answered_to){


                                bot.sendMessage(chatId,'Обмен прошел успешно!');
                                bot.sendMessage(user.chat_id,'Обмен прошел успешно!')

                                exchange.status = 'ended';
                            }
                            
                            exchange.save().then(()=>{
                            
                            })
                        })

                    
                    } else {
                        User.find({login: exchange.from}).then(u=>{
                            let user = u[0];
                            bot.sendMessage(user.chat_id, '🥳Ваш сокурсник ответил верно!');

                            exchange.answered_to = true;

                        if(exchange.answered_from){
                            bot.sendMessage(chatId,'Обмен прошел успешно!');
                            bot.sendMessage(user.chat_id,'Обмен прошел успешно!')

                            exchange.status = 'ended';
                        }

                        
                        exchange.save().then(()=>{
                        
                        })
                        })

                        
                    }
                
                } else {
                    bot.sendMessage(chatId,'Вы уже отвечали на этот вопрос!')
                }
            })
        } else {
            bot.sendMessage(chatId, '🤦‍♂️Вы ответили неверно!');
            Exchange.find({_id: exchange_id}).then(e=>{
                
                let exchange = e[0];

                if(exchange.status != 'ended'){

                    if(exchange.from == username){
                        User.find({login: exchange.to}).then((u)=>{
                            let user = u[0];
                            bot.sendMessage(user.chat_id, 'Ваш сокурсник ответил неверно. Обмен запрещен!')
                        })
                        exchange.status = 'ended';
                        exchange.save(()=>{

                        })
                    } else {
                        User.find({login: exchange.from}).then((u)=>{
                            let user = u[0];
                            bot.sendMessage(user.chat_id, 'Ваш сокурсник ответил неверно. Обмен запрещен!')
                        })
                        exchange.status = 'ended';
                        exchange.save(()=>{
                            
                        })
                    }

                } else {
                    bot.sendMessage(chatId,'Вы уже отвечали на этот вопрос!')
                }
            })

        }



        // console.log(msg)

    })


module.exports = router;