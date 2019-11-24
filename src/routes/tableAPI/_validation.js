const joi = require('@hapi/joi');


export const tableValidation = (data) =>{
    
    const schema = {
        token: joi.string().required(),
        tableName: joi.string().min(4).max(255).required(),
        categories: joi.array()
    }
    return joi.validate(data, schema);
}

export const updateValidation = (data) =>{
    const schema = {
        token: joi.string().required(),
        table: joi.string().min(6).max(255).required(),
        categories: joi.array()
    }
    return joi.validate(data, schema);
}

export const updateCategorie = (data) =>{
    const schema = {
        token: joi.string().required(),
        table: joi.string().min(6).max(255).required(),
        categorie: joi.number().required(),
        name: joi.string().max(255).required()
    }
    return joi.validate(data, schema);
}

export const updateCell = (data) =>{
    const schema = {
        token: joi.string().required(),
        table: joi.string().min(6).max(255).required(),
        categorie: joi.number().required(),
        row: joi.number().required(),
        cell: joi.string().max(255).required()
    }
    return joi.validate(data, schema);
}
