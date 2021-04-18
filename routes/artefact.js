var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var Artefact = require('../models/artefact');
var User = require('../models/users');
var func = require('../functions');
var bot = require('../bot/bot');

router.use(bodyParser.json());


router.put('/create', (req, res) => {
    Artefact.create({name: req.body.name, img: `/public/images/${req.body.img_name}`, description: req.body.description, id: req.body.id}).then(artefact=>{
        res.statusCode = 200;
        res.json({status: 'success', artefact: artefact})
    })
})

router.post('/add', (req,res)=>{
    User.find({login: req.body.login }).then(user=>{
      if(user[0] != undefined){
        let random = func.random(1,4);
        console.log(random)
        Artefact.find({id: random}).then(artefact=>{
          console.log(artefact)
          user[0].artefacts.push(artefact[0]);
          user[0].save().then(()=>{
            res.statusCode = 200;
            res.json({status: 'success', userArtefacts: user[0].artefacts })

            let msg = `😱Поздравляю, вы получили артефакт <b>${artefact[0].name}</b> с уникальным свойством <b>${artefact[0].description} </b>`;
            console.log(req.body.login)

            bot.sendMessage(user[0].chat_id, msg, { parse_mode: "HTML" });
          })
        })
      } else {
        res.statusCode = 400;
        res.json({err: 'user doesnt exist'})
      }
    })
  })




module.exports = router;