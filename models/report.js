const mongoose=require('mongoose');


const reportSchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },

    status:{
        type:String,
        required:true,
        enum:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit']
    },

doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    }
},{
    timestamps:true
});
const report=mongoose.model('Report',reportSchema);
module.exports=report;