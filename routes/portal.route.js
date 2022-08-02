const express = require('express')
const portalController = require('../controllers/Portal/portal.controller')
const verifyAdmin = require('../middlewares/verifyAdmin.middleware')

const router = express.Router()


router
    .route('/')
    .get(verifyAdmin, portalController.getPortals)
    .post(verifyAdmin, portalController.addPortal)

router
    .route('/:id')
    .put(verifyAdmin, portalController.updatePortal)
    .delete(verifyAdmin, portalController.deletePortal)


module.exports = router;