import Table from './_Table';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function del(req, res){
    //validate the token
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err) {
            res.statusCode=400;
            return res.end(err.message);
        }else{
            //checking if the user is already in the DB
            const table = await Table.findById(req.body.table);
            if(!table){ res.statusCode=400; return res.end("No table found"); }

            try{
                await table.remove();
                res.end("Deleted table");
            }catch(err){
                res.statusCode=400;
                res.end(err);
            }
        }
      });
    
};