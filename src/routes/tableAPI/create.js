import Table from './_Table';
import User from '../auth/_User';
import {tableValidation} from './_validation';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function post(req, res){
    //validate req.body
    const {error} = tableValidation(req.body);
    if(error){ res.statusCode=400; return res.end(error.details[0].message); }
    
    //validate the token
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err) {
            res.statusCode=400;
            return res.end(err.message);
        }else{
            //checking if the user is in the DB
            const user = await User.findOne({ email: decoded.userEmail });
            if(!user){ res.statusCode=400; return res.end("No such user found " + decoded.userEmail); }
            
            
            const table = new Table({
                owner: user._id,
                tableName: req.body.tableName,
                categories: []
            });
            req.body.categories.forEach(category => {
                let rows = [];
                category.rows.forEach(row=> {
                    rows.push({
                        row: row.row,
                        cell: row.cell
                    });
                });
                table.categories.push({
                    name: category.name,
                    selected: category.selected,
                    rows: rows
                });
            });
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
