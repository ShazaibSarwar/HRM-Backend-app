const express = require('express')
const roleController = require('../controllers/Role/role.controller')
const verifyAdminHR = require('../middlewares/verifyAdminHR.middleware')

const router = express.Router()

// router.post('/', companyController.createCompany)

router
    .route('/')
    .get(verifyAdminHR, roleController.getRole)
    .post(verifyAdminHR, roleController.addRole)

router
    .route('/:id')
    .put(verifyAdminHR, roleController.updateRole)
    .delete(verifyAdminHR, roleController.deleteRole)


module.exports = router;