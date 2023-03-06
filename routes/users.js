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
    res.send(users);
});

router.get('/:id', (req, res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user)//404 Object not found
        return res.status(404).send('The user with the given id was not found');
    res.send(user);
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
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

router.put('/:id', (req,res)=>{
    //Look up user
    //If not existing, return 404
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user)//404 Object not found
        return res.status(404).send('The user with the given id was not found');

    // Validate
    //If invalid, return 400 error

    //Object destructuring
    const { error } = validateuser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update user
    user.name = req.body.name;
    //return updated user to client
    res.send(user);
});

function validateuser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(user);
}

router.delete('/:id', (req, res)=>{
    //Look up user
    //return 404 if not
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user)//404 Object not found
        return res.status(404).send('The user with the given id was not found');

    //Delete
    const index = users.indexOf(user);
    users.splice(index, 1);

    //return the same user
    res.send(user);
});

module.exports = router;