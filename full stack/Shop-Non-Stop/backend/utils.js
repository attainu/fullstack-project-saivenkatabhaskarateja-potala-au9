import jwt from 'jsonwebtoken'

export const generateToken = (user) =>{
    return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },process.env.JWT_SECRET|| "some secret",
    {
        expiresIn:'1d'
    });
}

export const isAuth= (req,res,next) =>{
  console.log("came to order isAuth");
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7,authorization.length);//Bearer xxxxx
    jwt.verify(token,process.env.JWT_SECRET || "somethingsecret",(err,decode)=>{
      if(err){
        res.status(401).send({message:"Invalid Token"})
        console.log("came here to is auth err")
      }
      else{
        console.log("came here")
        req.user = decode;
        next();
      }
    })
  }
  else{
    res.status(401).send({message:"No Token"})
  }
}