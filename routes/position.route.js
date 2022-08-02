const express = require('express')
const positionController = require('../controllers/Position/position.controller')
const verifyAdminHR = require('../middlewares/verifyAdminHR.middleware')

const router = express.Router()

// router.post('/', companyController.createCompany)

router
    .route('/')
    .get(verifyAdminHR, positionController.getPositions)
    .post(verifyAdminHR, positionController.addPosition)

router
    .route('/:id')
    .put(verifyAdminHR, positionController.updatePosition)
    .delete(verifyAdminHR, positionController.deletePosition)


module.exports = router;