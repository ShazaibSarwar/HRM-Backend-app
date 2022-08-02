const express = require('express')
const departmentController = require('../controllers/Department/department.controller')
const verifyAdminHR = require('../middlewares/verifyAdminHR.middleware')

const router = express.Router()

router
    .route('/')
    .get(verifyAdminHR, departmentController.getDepartment)
    .post(verifyAdminHR, departmentController.createDepartment)

router
    .route('/:id')
    .put(verifyAdminHR, departmentController.updateDepartment)
    .delete(verifyAdminHR, departmentController.deleteDepartment)


module.exports = router;

