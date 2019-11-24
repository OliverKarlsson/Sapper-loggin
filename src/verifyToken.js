
export function verifyToken(req,res,next){
    console.log(req.session.user);
    //req.session.user="Anders";
    next();
}