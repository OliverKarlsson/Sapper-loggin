import User from './_User';
import {emailValidation} from './_validation';

export async function patch(req, res){
    //validate req.body
    const {error} = emailValidation(req.body);
    if(error){ res.statusCode=400; return res.end(error.details[0].message); }
    //checking if the user is already in the DB
    const user = await User.findOne({ email: req.body.email });
    if(!user){ res.statusCode=400; return res.end("User not found"); }

    user.email = req.body.n_email;  
    try{
        const savedUser = await user.save();
        res.end(JSON.stringify({user: user._id}));
    }catch(err){
        res.statusCode=400;
        res.end(err);
    }
};