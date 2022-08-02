const express = require('express')
const leaveController = require('../controllers/Leave/leave.controller')
const verifyEmployee = require('../middlewares/verifyEmployee.middleware')
const verifyHR = require('../middlewares/verifyHr.middleware')

const router = express.Router()

// router.post('/', companyController.createCompany)

router
    .route('/emp/:id')
    .get(verifyEmployee, leaveController.getLeaves)
    .post(verifyEmployee, leaveController.makeLeave)
    .put(verifyEmployee, leaveController.updateLeave)

router
    .route('emp/:id/:id2')
    .delete(verifyEmployee, leaveController.deleteLeave)

router
    .route('/hr')
    .get(verifyHR, leaveController.getLeavesHR)

router
    .route('/hr/:id')
    .put(verifyHR, leaveController.updateLeaveHR)

router
    .route('/hr/:id/:id2')
    .delete(verifyHR, leaveController.deleteLeaveHR)


module.exports = router;