const express = require('express')
const employeeController = require('../controllers/Employee/employee.controller')
const verifyHR = require('../middlewares/verifyHr.middleware')
const verifyHrEmployee = require('../middlewares/verifyHrEmployee.middleware')
const verifyEmployee = require('../middlewares/verifyEmployee.middleware')


const router = express.Router()


router
    .route('/')
    .get(verifyHR, employeeController.getEmployees)
    .post(verifyHR,employeeController.addEmployee)

router
    .route('/:id')
    .put(verifyHR,employeeController.updateEmployee)
    .delete(verifyHR,employeeController.deleteEmployee)

router
    .route('/personal-info/:id')
    .get(verifyHrEmployee, employeeController.getPersonalInfo)
    .put(verifyEmployee, employeeController.updatePersonalInfo)


module.exports = router;