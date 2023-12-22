const db = require('../models/indexStart')

const createError = require('http-errors')

const Login = db.login;

module.exports={
    addUser :async(req, res, next)=>{
        try{
            let info ={
                email :req.body.email,
                password: req.body.password
            };
            const addLogin = await Login.create(info)
            res.status(200).send(addLogin)
        }catch(error){
            console.error("Validation Error Details:", error.errors); // Log validation error details
            next(error)
        }
    },
    getAllUser :async(req, res, next)=>{
        try{
            let allUsers = await Login.findAll({})
        }catch(error){
            next(error)
        }
    },
    getUser :async(req, res, next)=>{
        try{
            let id = req.params.id
            let user =await Login.findOne({where: {login_id: id}})

            if(!user){
                throw(createError(404, "user does not exist"))
            }
            res.status(200).send(user)
        }catch(error){
            next(error)
        }
    },
    updateUser :async(req, res, next)=>{
        try{
            let id = req.params.id
            let user =await Login.update(req.body,{ where: {login_id: id}})

            if(!user){
                throw(createError(404, "user does not exist"))
            }
            res.status(200).send(user)
        }catch(error){
            next(error)
        }
    },
    deleteUser :async(req, res, next)=>{
        try{
            let id = req.params.id
            await Login.destroy({where: {login_id: id}})

            if(!user){
                throw(createError(404, "user does not exist"))
            }
            res.status(200).send('user deleted successfully')
        }catch(error){
            next(error)
        }
    },
}