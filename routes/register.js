const Joi = require('joi');
const pug = require('pug');
const express = require('express');
const router = express.Router();

const users = [
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 3, name: 'user3'},
];

router.get('/', (req, res)=> {
    res.render('../views/register.pug');
});

router.get('/all', (req, res)=> {
    res.send(users);
});

//Define schema for Joi. What the object should look like

router.post('/', (req, res)=>{
    const { error } = validateuser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
        id: users.length+1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(user);
    res.redirect('/api/register/all');
    //res.send(user);
    //console.log(req.body);
});

function validateuser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().required()
    });
    
    return schema.validate(user);
}

module.exports = router;