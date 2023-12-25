const express = require('express')
const routes =express.Router();
const loginController = require('../controllers/loginController')


routes.post('/user',loginController.user)
routes.post('/postRefreshToken',loginController.PostRefreshToken)
routes.get('/getAllUser',loginController.getAllUser)
routes.get('/getUser/:id',loginController.getUser)
routes.put('/updateUser/:id',loginController.updateUser)
routes.delete('/deleteUser/:id',loginController.deleteUser)



module.exports = routes;