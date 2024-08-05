//import noteModel from "../../../../DB/model/note.model.js"
import userModel from "../../../../DB/model/user.model.js"
import jwt from 'jsonwebtoken'
import auth from "../../../middleware/auth.middelware.js"


export const getUserModule =   async(req, res, next) => {
    const users = await userModel.find()
    return res.json({ message: "done",users})
}



export const profile =async (req,res,next)=>{

try {
    //    console.log(req.user);
      const user =await userModel.findById(req.user._id);
       return res.json({ message: "done", user });

} catch (error) {
                return res.json({ message: "catch error p",error:error.stack});
}
} 

export const update = async (req,res,next)=>{
     const {token}= req.headers
     //console.log(token);
     if (!token) {
        return res.json({message:"token is required"})
     }
     const decode = jwt.verify(token, process.env.TOKEN_SIGNATURE);
try {
        const user = await userModel.findByIdAndUpdate(decode.id,req.body,{ new: true });
        return user
          ? res.json({ message: "done", user })
          : res.json({ message: "in_valid data " });
} catch (error) {
        return res.json({ message: "catch error ",error});
}
}

export const deleteUser = async (req,res,next)=>{
    const {token}=req.headers
    //console.log(token);
    if (!token) {
        return res.json({message:"token is required"})
    }
    const decode = jwt.verify(token, process.env.TOKEN_SIGNATURE);
try {
        const User = await userModel.findByIdAndDelete(decode.id);
        return User
          ? res.json({ message: "done" })   
          : res.json({ message: "in_valid id acc" });
} catch (error) {
        return res.json({ message: "catch error", error})
}
    } 