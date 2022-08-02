const express = require('express')
const infoController = require('../controllers/FamiliyInfo/familyInfo.controller')
const verifyHrEmployee = require('../middlewares/verifyHrEmployee.middleware')
const verifyEmployee = require('../middlewares/verifyEmployee.middleware')
const router = express.Router()


router
    .route('/:id')
    .get(verifyHrEmployee, infoController.getInfo)
    .post(verifyEmployee, infoController.addInfo)
    .put(verifyEmployee, infoController.updateInfo)

    
router
    .route('/:id/:id2')
    .delete(verifyEmployee, infoController.deleteInfo)


module.exports = router;