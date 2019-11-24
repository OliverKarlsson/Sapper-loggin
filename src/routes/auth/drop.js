import User from './_User';

export async function del(req, res){
    
    //checking if the user is already in the DB
    const user = await User.findOne({ email: req.body.email });
    if(!user){ res.statusCode=400; return res.end("No user found"); }

    

    try{
        await user.remove();
        res.end("Deleted user");
    }catch(err){
        res.statusCode=400;
        res.end(err);
    }
};