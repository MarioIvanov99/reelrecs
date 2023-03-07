const Joi = require('joi');
const pug = require('pug');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const users = [
    {id: 1, name: 'user1', email: 'test@test.com', password: '123'},
    {id: 2, name: 'user2', email: 'test2@test.com', password: '456'},
    {id: 3, name: 'user3', email: 'test3@test.com', password: '789'},
];

router.get('/', (req, res)=> {
    res.render('../views/register.pug');
});

router.get('/all', (req, res)=> {
    res.send(users);
});

//Define schema for Joi. What the object should look like

router.post('/', async (req, res)=>{
    const { error } = validateuser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        await createUser(users.length+1, req.body.name, req.body.email, req.body.password);
        // Redirect to the profile page for the new user
        res.redirect('/api/register/all');
      } catch (error) {
        console.error(error);
      }
});

function validateuser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/).required()
    });
    
    return schema.validate(user);
}


async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return { salt, hashedPassword };
}

async function createUser(id, name, email, password) {

    const { salt, hashedPassword } = await hashPassword(password);

    const user = {
        id: id,
        name: name,
        email: email,
        password: hashedPassword,
        salt: salt
    };

    users.push(user);

  }

module.exports = router;