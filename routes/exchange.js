var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var Exchange = require('../models/exchange');
var User = require('../models/users');
var func = require('../functions');
var bot = require('../bot/bot');
var Quiz = require('../models/quiz');


router.post('/create', (req,res)=>{
    let from = req.body.from;
    let to = req.body.to;
    let artefact_from = req.body.artefact_from;
    let artefact_to = req.body.artefact_to;

    Exchange.create({from: from, to: to, artefact_from: artefact_from, artefact_to: artefact_to}).then(exchange=>{
        res.statusCode = 200;
        res.json({status: true});
    });


})

router.post('/submit', (req,res)=>{
    let exchange_id = req.body.exchange_id;
    let accepter = req.body.login;

    Exchange.find({_id: exchange_id}).then(exchange=>{
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
                                [{ text: answers[0], callback_data: {wxchange_id: exchange[0]._id, right_answer: answers[right_answer]} },{ text: answers[1], callback_data: {wxchange_id: exchange[0]._id, right_answer: answers[right_answer]} }],
                                [{ text: answers[2], callback_data: {wxchange_id: exchange[0]._id, right_answer: answers[right_answer]} }, { text: answers[3], callback_data: {wxchange_id: exchange[0]._id, right_answer: answers[right_answer]} }]
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

                          })
                    })
                })
        }
    })
})

    router.get('/:login', (req, res)=>{
        let login = req.params.login;

        Exchange.find({to: login, status: 'pending'}).then(ex=>{
            let exchange = ex[0]

            if(exchange == undefined){
                res.statusCode = 200;
                res.json({status: 'doesnt have pending exchanges', exchange: {}})
            } else {
                res.statusCode = 200;
                res.json({status: true, exchange: exchange });
            }
        })
    })


module.exports = router;