const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/hosp');
const db=mongoose.connection;


db.on('error',console.error.bind(console,"error in connection"));

db.once('open',()=>{
    console.log('successfully connected to db');
})