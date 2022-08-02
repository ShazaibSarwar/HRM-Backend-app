const express = require('express')
const educationController = require('../controllers/Education/education.controller')
const verifyHREmployee = require('../middlewares/verifyHrEmployee.middleware')
const verifyEmployee = require('../middlewares/verifyEmployee.middleware')

const router = express.Router()


router
    .route('/')
    .get(verifyHREmployee, educationController.getEducation)
    .post( educationController.addEducation)

router
    .route('/:id')
    .put( educationController.updateEducation)
    .put( educationController.deleteEducation)


module.exports = router;

