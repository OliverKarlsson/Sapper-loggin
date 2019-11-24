import Table from './_Table';
import User from '../auth/_User';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function post(req, res){
    //validate the token
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err) {
            res.statusCode=400;
            return res.end(err.message);
        }else{
            //checking if the user is already in the DB
    const user = await User.findOne({ email: decoded.userEmail });
    if(!user){ res.statusCode=400; return res.end("No user found"); }
    try{
        const tables = await Table.find({owner: user._id});
        res.end(JSON.stringify(tables));
    }catch(err){
        res.statusCode=400;
        res.end(err);
    }
        }
      });
    
};