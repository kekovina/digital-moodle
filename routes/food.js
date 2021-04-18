var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var Food = require('../models/food');
var User = require('../models/users');
var func = require('../functions');

router.use(bodyParser.json());

router.put('/create', (req, res) => {
    Food.create({name: req.body.name, description: req.body.description, id: req.body.id}).then(food=>{
        res.statusCode = 200;
        res.json({status: 'success', food: food})
    })
})

router.post('/add', (req,res)=>{
    User.find({login: req.body.login.substr(1) }).then(user=>{
      if(user[0] != undefined){
        let random = func.random(1,6);
        console.log(random)
        Food.find({id: random}).then(food=>{
        
          user[0].food.push(food[0]);
          user[0].save().then(()=>{
            res.statusCode = 200;
            res.json({status: 'success', userFood: user[0].food })
          })
        })
      } else {
        res.statusCode = 400;
        res.json({err: 'user doesnt exist'})
      }
    })
  })

module.exports = router;