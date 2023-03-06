const genres = require('./routes/users');
const registration = require('./routes/register');
const express = require('express');
const app = express();

app.set('view-engine', 'pug')

//allows parsing of json objects
//gets a piece of middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use('/api/users', genres);
app.use('/api/register', registration);

//Listening
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
