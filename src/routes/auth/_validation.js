const joi = require('@hapi/joi');

//Register validation
export const registerValidation = (data) =>{
    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema);
}

export const emailValidation = (data) =>{
    const schema = {
        email: joi.string().min(6).required().email(),
        n_email: joi.string().min(6).required().email()
    }
    return joi.validate(data, schema);
}

//Log in validation
export const loginValidation = (data) =>{
    const schema = {
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema);
}
