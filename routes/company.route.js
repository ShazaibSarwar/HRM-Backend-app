const express = require('express')
const companyController = require('../controllers/Company/company.controller')
const verifyHR = require('../middlewares/verifyHr.middleware')
const verifyAdminHR = require('../middlewares/verifyAdminHR.middleware')

const router = express.Router()

// router.post('/', companyController.createCompany)

router
    .route('/')
    .get(verifyAdminHR, companyController.getCompany)
    .post(verifyHR, companyController.createCompany)

router
    .route('/:id')
    .put(verifyHR, companyController.updateCompany)


module.exports = router;