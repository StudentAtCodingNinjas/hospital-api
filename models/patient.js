const mongoose=require('mongoose');


const patientSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },

    
    report:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Report'
    }]

}, {timestamps:true
});



const patient=mongoose.model('Patient',patientSchema);

module.exports=Patient;