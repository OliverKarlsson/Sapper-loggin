import Table from './_Table';
//import {Cell} from './_Table';
import {updateCell} from './_validation';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function patch(req, res){
    //validate req.body
    const {error} = updateCell(req.body);
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
            //console.log(JSON.stringify(table));
            
            

            const cll = table.categories[req.body.categorie].rows.findIndex(function(item) {
                return item.row === req.body.row;
            });
            if(cll>=0){
                table.categories[req.body.categorie].rows[cll].cell=req.body.cell;
            }else{
                table.categories[req.body.categorie].rows.push({
                    row:req.body.row,
                    cell:req.body.cell
                });
            }
            if(table.height<req.body.row+1){
                table.height=req.body.row+1;
            }
            
            table.markModified('rows');
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