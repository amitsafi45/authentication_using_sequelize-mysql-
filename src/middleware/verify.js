import Jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
   const accessToken=req.header('token') 
   if (!accessToken) return res.status(500).json({sucess:false,message:"token are not provided in request"});
    const veriyfied = await Jwt.verify(
      accessToken,
      process.env.accessToken
    );
    if(veriyfied) next();
    
  } 
  catch (err) {
    return res.status(500).json({sucess:false,message:"token are expired",detail:err});
  }
};
