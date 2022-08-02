const express = require("express")
const loginController = require('../controllers/Login/login.controller')

const router = express.Router()

router.post('/', loginController.login)

module.exports = router