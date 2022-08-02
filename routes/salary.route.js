const express = require('express')
const salaryController = require('../controllers/Salary/salary.controller')
const verifyHR = require('../middlewares/verifyHr.middleware')

const router = express.Router()



router
    .route('/')
    .get(verifyHR, salaryController.getSalaries)
    
    router
    .route('/:id')
    .post(verifyHR, salaryController.addSalary)
    .put(verifyHR, salaryController.updateSalary)
    .delete(verifyHR, salaryController.deleteSalary)


module.exports = router;