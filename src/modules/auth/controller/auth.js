import userModel from "../../../../DB/model/user.model.js"
import { generateToken } from "../../../utils/generateAndVenifyToken.js"
import  {hash,compare}  from "../../../utils/hashAndCompare.js"
export const getAuthModule =   (req, res, next) => {

    return res.json({ message: "Auth module" })

}

 export const getUsers = async (req,res,next)=>{
    const {gender,age} = req.query
    const users = await userModel.find({gender,age:{$gt:age}})
    return res.json({message:"done",users})
}


  export const signup = async (req,res,next) => 
{
try {
  const { userName, password, confirmPassword, email, age} = req.body;
//  console.log({ userName, password,confirmPassword, email, age});

if (password != confirmPassword) {
    return res.json({ message: "password & confirmPassword misMatch" });
} 
const checkUser = await userModel.findOne({email})
if (checkUser) {
        return res.json({ message: "email already exist",});
} 
 const hashValue = hash({plaintText:password})
 const user = await userModel.create({userName,password:hashValue,email,age,});
  return res.json({ message: "done", user });
} catch (error) {
      return res.json({ message: "catch error",error});
}

} 



export const logIn = async(req,res,next) =>{
    const {email,password} = req.body
try {
      const user = await userModel.findOne({email})
      if (!user) {
        return res.json({message:"IN_VALID EMAIL"})
      }
   //   console.log({fe:password, be:user.password});
      const match = compare({plaintText:password,hashValue:user.password})
      if (!match) {
       return res.json({ message: "IN_VALID Password", });   
      }
       const token = generateToken({
         payload: { ID: user._id, isLoggedIn:true },
         expiresIn: 60*60*24*30,
       });
      return  res.json({message: "done",user,token})

} catch (error) {
     res.json({ message: "catch error",error});
}
}
