import jwt from 'jsonwebtoken'

export const generateToken = (user) =>{
    return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller:user.isSeller,
    },process.env.JWT_SECRET|| "somesecret",
    {
        expiresIn:'1d'
    });
}

export const isAuth= (req,res,next) =>{
  console.log("came to isAuth")
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7,authorization.length);//Bearer xxxxx
    jwt.verify(token, process.env.JWT_SECRET || "somesecret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        console.log("inside success of isAuth");
        req.user = decode;
        next();
      }
    });
  }
  else{
    res.status(401).send({message:"No Token"})
  }
}

export const isAdmin = (req,res,next) => {
    console.log("came to isAdmin")
    if(req.user && req.user.isAdmin){
      console.log("inside sucess of isAdmin")
      next()
    }
    else{
      res.status(401).send({message:"invalid admin token"})
    }

}

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};

export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};