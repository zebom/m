const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController');
const { verifyAccessToken } = require('../helpers/jwtHelper');

// const router = require('./registerRoutes')

router.post('/registerUser', registerController.registerUser);
router.get('/getAllregistered', verifyAccessToken,registerController.getAllregistered)
router.get('/getRegister/:id',registerController.getRegister)
router.put('/updateRegister/:id',registerController. updateRegister)
router.delete('/deleteRegister/:id',registerController.deleteRegister)


module.exports = router