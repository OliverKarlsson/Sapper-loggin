import bcrypt from 'bcryptjs';
import User from './_User';
import {registerValidation} from './_validation';

export async function post(req, res){
    //validate req.body
    const {error} = registerValidation(req.body);
    if(error){ res.writeHead(400, {'Errors': error.details[0].message});
        return res.end(error.details[0].message); }
    //checking if the user is already in the DB
    const emailExists = await User.findOne({ email: req.body.email });
    if(emailExists){ res.writeHead(400, {'Errors': "User with email already exists."});
     return res.end("User already exists"); }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    //creates user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.end(JSON.stringify({user: user._id}));
    }catch(err){
        res.writeHead(400, {'Errors': err});
        res.end(err);
    }
};
