const mongoose = require('mongoose');



const cellSchema = new mongoose.Schema({
    row:{type:Number},
    cell:{type: String, max: 255}
});

const categorieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min:4
    },
    selected: {
        type: Boolean
    },
    rows:[cellSchema]
});


const tableSchema = new mongoose.Schema({
    owner:{
        type: String
    },
    tableName:{
        type: String,
        required: true,
        max: 255,
        min:4
    },
    categories:[categorieSchema],
    height:{
        type:Number,
        default:1,
        min:1
    }
});


module.exports = mongoose.model('Table', tableSchema);