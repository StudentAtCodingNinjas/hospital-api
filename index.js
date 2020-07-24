const express=require('express');
const port=8000;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const db=require('./config/mongoose');

const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(passport.initialize());

app.use('/',require('./routes'));



app.listen(port,(err)=>{
    if(err)  { console.log(`error in starting server : ${err}`); return; }

    console.log(`Server is up and running on port ${8000}`);
});