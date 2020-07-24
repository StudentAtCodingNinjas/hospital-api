const express = require('express');
const passport=require('passport');
const router = express.Router();


const doctor_Controller = require('../controllers/api/doctor_controller');



router.post('/register',doctor_Controller.Register_Doctor);

router.post('/login',doctor_Controller.login);

router.post('/register_patient',passport.authenticate('jwt',{session:false}),doctorController.Register_Patient);

module.exports = router;