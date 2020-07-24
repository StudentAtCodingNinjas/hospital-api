const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
const Report=require('../models/report');
const jwt=require('jsonwebtoken');

module.exports.Register_Doctor=async (req,res)=>{
    
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(404).json({
            message:"Fill all required fields"
        })
    }

    try{
        const doctor=new Doctor({

            
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        });
        
        const newDoctor=await doctor.save();
        res.status(201).json(newDoctor);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


module.exports.login=async (req,res)=>{
    
    if(!req.body.email || !req.body.password){
        return res.status(404).json({
            message: "required fields not filled"
        });
    }

    try{

        let doctor=await Doctor.findOne({email:req.body.email});
        
        if(!doctor||doctor.password!=req.body.password)
        {
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }
        
        return res.status(200).json({
            message:'Signed in successfully',
            data:{
                
                token:jwt.sign(doctor.toJSON(),'hospital_api',{expiresIn:'10000000'})
            }
        });
    }
    catch(err)
    {
        return res.json(500,{
            message:'Internal Server error'
        });
    }
}


module.exports.Register_Patient=async (req,res)=>{
    try{
        let doctor=await Doctor.findOne({_id:req.user});
        
        
        if(!doctor)
        {
            throw new Error('Doctor not found in the database');
        }
        let patient=await Patient.findOne({phone:req.body.phone});
        if(patient)
        {
            return res.status(201).json({
                message:"Patient Already exists",
                patient
            })
        }
        const newPatient=await Patient.create({
            phone:req.body.phone,
            name:req.body.name,
            doctor:req.user,
            report:req.body.report
        });
        doctor.patient.push(newPatient);
        doctor.save();
        return res.status(201).json({
            message:"new patient added",
            newPatient
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}  


module.exports.status=async (req,res)=>{
    try{
        let report=await Report.findOne({status:req.params.status});
        if(report)
        {
            return res.status(201).json({
                message:"reports",
                report
            })
        }
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}