const db = require('../models/indexStart')
const createError = require('http-errors')
const loginSchema = require('../auth/loginSchema');
const { signAccessToken, signRefreshToken, } = require('../helpers/jwtHelper');
const { verifyRefreshTOKEN} = require ('../helpers/jwtHelper')
// const Register = require("../models/registerModel")
const Register = require("../models/indexStart").register;


const Login = db.login;

module.exports={
    user: async (req, res, next) => {
        try{
         let info = {
            email: req.body.email,
            password: req.body.password
          };
          const result = await loginSchema.validateAsync(info);
          const userInstance = await Register.findOne({ where: { email: result.email } });
          if(!userInstance) throw createError.NotFound('userInstance not registered')

          const isMatch = await userInstance.isValidPassword(result.password)
          if(!isMatch) throw createError.Unauthorized('Email/Password is not valid')

          const accessToken = await signAccessToken(userInstance.id)
          const refreshToken = await signRefreshToken(userInstance.id)

        //   res.status(200).send(result)
          res.status(200).send({accessToken,
             refreshToken,
             role: userInstance.userType
            })

        }catch(error){
            if(error.isJoi === true) return next(createError.BadRequest('invalid Email/Password'))
            console.error('Error in user controller:', error);
            console.log('User Type:', userInstance.userType);
            console.log('User Type:', userInstance.userType);
            next(error)
        }
    },
    PostRefreshToken: async (req, res, next) => {
        try {
            console.log('Request received for PostRefreshToken controller:', req.path);

            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
            const loginId = await verifyRefreshTOKEN(refreshToken);

            const accessToken = await signAccessToken(loginId);
            const refToken = await signRefreshToken(loginId);
            res.send({ accessToken: accessToken, refreshToken: refToken });

        } catch (error) {
            console.error('Error in PostRefreshToken controller:', error);
            next(error);
        }
    },
    
    getAllUser :async(req, res, next)=>{
        try{
            let allUsers = await Login.findAll({})
            res.status(200).json(allUsers);
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

   // try {
    //         let info = {
    //             email: req.body.email,
    //             password: req.body.password
    //         };

    //         // Validate login information using the loginSchema
    //         const result = await loginSchema.validateAsync(info);

    //         // Find the user by email
    //         const userInstance = await Login.findOne({ where: { email: result.email } });

    //         console.log('SQL Query:', userInstance ? userInstance.sql : 'User not found');
    //         console.log('User found:', userInstance ? userInstance.dataValues : 'User not found');

    //         // Check if the user exists
    //         if (!userInstance) {
    //             throw createError.NotFound('User not registered');
    //         }

    //         // Validate the provided password
    //         const isMatch = await userInstance.isValidPassword(result.password);

    //         console.log('Provided Password:', result.password);
    //         console.log('Stored Password:', userInstance.password);
    //         console.log('Password match:', isMatch);

    //         // If the passwords don't match, throw an Unauthorized error
    //         if (!isMatch) {
    //             throw createError.Unauthorized('Email/password is not valid');
    //         }

    //         // Return the user in the response
    //         res.status(200).send(userInstance);
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         if (error.isJoi === true) {
    //             return next(createError.BadRequest('Invalid email/password'));
    //         }
    //         next(error);
    //     }