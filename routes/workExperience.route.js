const express = require('express')
const workController = require('../controllers/WorkExperience/workExperience.controller')
const verifyHREmployee = require('../middlewares/verifyHrEmployee.middleware')
const verifyEmployee = require('../middlewares/verifyEmployee.middleware')

const router = express.Router()



router
    .route('/:id')
    .get(verifyHREmployee, workController.getWorkExperience)
    .post( workController.addWorkExperience)
    .put(verifyEmployee, workController.updateWorkExperience)


router
    .route('/:id/:id2')
    .delete(verifyEmployee, workController.deleteEorkExperience)


module.exports = router;