import bcrypt from 'bcryptjs';
import User from './_User';
import {loginValidation} from './_validation';
const jwt = require('jsonwebtoken');
import * as env from 'dotenv';
env.config();

export async function post(req, res){
    const wrong_input_msg = "Wrong email or password";
    const {error} = loginValidation(req.body);
    if(error){ res.statusCode=400; return res.end(error.details[0].message); }
    //checking if user exist
    const user = await User.findOne({ email: req.body.email });
    if(!user){ res.statusCode=400; return res.end(wrong_input_msg); }
    //checking if password for user is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){ res.statusCode=400; return res.end(wrong_input_msg); }
    
    //create and asign a token
    const payload = {
        expiresIn: "2h",
        userName: user.name,
        userEmail: user.email,
        admin: true
      };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.writeHead(200, {'AuthToken': token});
    req.session.user=token;
    res.end('Succesful login '+token);
};