import Table from './_Table';
import {updateCategorie} from './_validation';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function patch(req, res){
    //validate req.body
    const {error} = updateCategorie(req.body);
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
            const present = table.categories.find(c=>c.name===req.body.name);
            if(present){
                res.statusCode=400; return res.end('Categorie with the name "'+req.body.name+'" already exist.');
            }
            table.categories[req.body.categorie].name = req.body.name;
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