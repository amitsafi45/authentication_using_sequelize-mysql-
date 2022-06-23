import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class controller {
  static insert = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(15);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const Register={
        UserName: req.body.UserName,
        emailAddress: req.body.emailAddress,
        password: hashPassword
        }
        await db.schema.create(Register)
        res.status(200).json({
        sucess:true,
        message:'user are register'
      })
    } catch (err) {
      res.status(500).json({
        sucess:false,
        message:'user are not register'
      })
    }
  };
  static login = async (req, res) => {
    try {
      const userValidation = await db.schema.findOne({where:{emailAddress:req.body.emailAddress},raw:true});
      if (!userValidation) return res.status(500).json({sucess:false,message:'email is not valid'})
      const passValidation = await bcrypt.compare(
        req.body.password,
        userValidation.password
      );
      if (!passValidation) return res.status(500).json({sucess:false,message:'password is not valid'})
      const accessToken = await jwt.sign(
        { _id: userValidation._id },
        process.env.accessToken,
        {
          expiresIn: "1d",
        }
      );
    res.status(200).json({sucess:true,message:'user loged in',token:accessToken})
   } 
   catch (error) {
    console.log(error);
     res.status(500).json({
       sucess:false,
       message:'token is not generated'
     })
       }
  }
  
}
export default controller;
