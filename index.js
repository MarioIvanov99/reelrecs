const genres = require('./routes/users');
const express = require('express');
const app = express();

//allows parsing of json objects
//gets a piece of middleware
app.use(express.json());

app.use('/api/users', genres);

//Listening
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
