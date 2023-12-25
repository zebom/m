const Joi = require('joi')

const authSchema =Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    // number: Joi.string().pattern(/^(0|[1-9][0-9]{0,9})$/).required(),
    number: Joi.string().required(),

    gender: Joi.string().required(),
    age: Joi.number().integer().positive().max(150).required(),
    userType: Joi.string().required(),
    specialization: Joi.string().optional(),
    licenseNumber: Joi.number().positive().optional(),
    adminCode: Joi.string().min(1).optional(),
    position: Joi.string().optional(),
    address: Joi.string().optional(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

module.exports = authSchema