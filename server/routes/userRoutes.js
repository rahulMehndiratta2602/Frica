const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const router = express.Router()

router.post("/createOrUpdateUser", authController.authCheck, userController.createOrUpdateUser)
router.post("/getMe", authController.authCheck, userController.getMe)
router.post("/isAdmin", authController.authCheck, authController.isAdmin, userController.getMe)

module.exports = router