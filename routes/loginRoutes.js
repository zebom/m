const express = require('express')
const routes =express.Router();
const loginController = require('../controllers/loginController')

routes.post('/addUser',loginController.addUser)
routes.get('/getAllUser',loginController.getAllUser)
routes.get('/getUser/:id',loginController.getUser)
routes.put('/updateUser/:id',loginController.updateUser)
routes.delete('/updateUser/:id',loginController.deleteUser)



module.exports = routes;