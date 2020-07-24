const express= require('express');
const passport=require('passport');
const router= express.Router();

const patient_Controller = require('../controllers/api/patient_controller');



router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patient_Controller.createReport);
router.get('/:id/all_reports',passport.authenticate('jwt',{session:false}),patient_Controller.get_All_Reports);
router.get('/reports/:status',passport.authenticate('jwt',{session:false}),patient_Controller.status);


module.exports= router;