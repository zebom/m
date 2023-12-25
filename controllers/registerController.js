const db = require('../models/indexStart')
const createError = require('http-errors')
const authSchema = require('../auth/authSchema')

const Register = db.register

module.exports ={
    // registerUser: async (req, res, next) =>{
    //     try{
    //         let registerInfo = req.body;
    //         const result = await authSchema.validateAsync(registerInfo); 
    //         const exist =await Register.findOne({email:result.email});
    //         if (exist){
    //             throw createError.Conflict(`Email ${result.email} already exists`)
    //         }
    //         const registeredUser= await Register.create(registerInfo)

    //         // const register = new Register(result)
    //         res.status(201).json(registeredUser)
    //     }catch (error){
    //         console.error("Validation Error Details:", error.errors); // Log validation error details
    //         if(error.isJoi === true){
    //             error.status = 422
    //         };
    //         next(error) 
    //     }
    // },const db = require('../models/indexStart');

    registerUser: async (req, res, next) => {
        try {
            let registerInfo = req.body;
            const result = await authSchema.validateAsync(registerInfo);

            // Convert the email to lowercase and trim whitespaces
            const normalizedEmail = result.email.trim().toLowerCase();

            // Check for existing records
            const exist = await Register.findOne({ where: { email: normalizedEmail } });

            // If an existing record is found, throw a conflict error
            if (exist) {
                throw createError.Conflict(`Email ${result.email} already exists`);
            }

            // If no existing record is found, create a new one
            const registeredUser = await Register.create({ ...result, email: normalizedEmail });

            // Return the created user in the response
            res.status(201).json(registeredUser);
        } catch (error) {
            console.error("Validation Error Details:", error.errors);
            
            // If it's a Joi error, set the status to 422
            if (error.isJoi === true) {
                error.status = 422;
            }

            next(error);
        }
    },


    getAllregistered: async (req, res, next) => {
        try {
            let allRegistered = await Register.findAll({});
            res.status(200).json(allRegistered);
        } catch (error) {
            next(error);
        }
    },
    
    // 
  getRegister :async(req, res, next)=>{
    try{
        let id = req.params.id
        let register = await Register.findOne({where: {register_id: id}})

        if(!register){
            throw(createError(404, "register does not exist"))
        }
        res.status(200).send(register)
    }catch(error){
        next(error)
    }
  },
    
    updateRegister: async (req, res, next) => {
        try {
            let id = req.params.id;
            let register = await Register.update(req.body, { where: { register_id: id } });
    
            if (!register) {
                throw createError(404, "Register does not exist");
            }
            res.status(200).send(register);
        } catch (error) {
            next(error);
        }
    },
    
    deleteRegister: async (req, res, next) => {
        try {
            let id = req.params.id;
            let register = await Register.destroy({ where: { register_id: id } });
    
            if (!register) {
                throw createError(404, "Register does not exist");
            }
            res.status(200).send('Register deleted successfully');
        } catch (error) {
            next(error);
        }
    },
    
}