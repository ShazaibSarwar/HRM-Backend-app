const express = require('express')
const projectController = require('../controllers/Project/project.controller')
const verifyAdmin = require('../middlewares/verifyAdmin.middleware')

const router = express.Router()


router
    .route('/')
    .get(verifyAdmin, projectController.getProjects)
    .post(verifyAdmin, projectController.addProject)

router
    .route('/:id')
    .put(verifyAdmin, projectController.updateProject)
    .delete(verifyAdmin, projectController.deleteProject)


module.exports = router;