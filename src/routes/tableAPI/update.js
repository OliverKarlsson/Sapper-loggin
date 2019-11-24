import Table from './_Table';
import {updateValidation} from './_validation';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function patch(req, res){
    //validate req.body
    const {error} = updateValidation(req.body);
    if(error){ res.statusCode=400; return res.end(error.details[0].message); }
    //validate the token
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err) {
            res.statusCode=400;
            return res.end(err.message);
        }else{
            //checking if the user is already in the DB
            const table = await Table.findById(req.body.table);
            if(!table){ res.statusCode=400; return res.end("Table not found"); }
            const categories=table.categories.map(function(cat){
                return {name: cat.name, selected: cat.selected, rows: cat.rows}
            });

            if(categories != req.body.categories)
                table.categories = req.body.categories;

                table.markModified('categories');
            try{
                const savedTable = await table.save();
                res.end(JSON.stringify(table));
            }catch(err){
                res.statusCode=400;
                res.end(err);
            }
        }
      });
    
};