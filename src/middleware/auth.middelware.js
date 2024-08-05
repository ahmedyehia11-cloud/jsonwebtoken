import userModel from '../../DB/model/user.model.js';
import { verifyToken } from '../utils/generateAndVenifyToken.js';



const auth =async (req,res,next)=>{

try {

const {authorization} = req.headers
//console.log(authorization);
if (!authorization?.startsWith(process.env.BEARER_TOKEN)) {
  return res.json({ message: "IN_VALID TOKEN" });
}
  
const token = authorization.split(process.env.BEARER_TOKEN)[1];
//console.log({token});


  
  //        const {authorization} = req.headers 
  //        console.log({authorization});
  //        console.log(authorization.startsWith(process.env.BEARER_TOKEN));
  //        if (!authorization?.startsWith(process.env.BEARER_TOKEN)) {
  //          return res.json({ message: "token is required" }); 
  //        }
  //         const token = authorization.split(process.env.BEARER_TOKEN)[1];  
  //         console.log({token});

    if (!token) {
      return res.json({ message: "token is required" });
    }
    const decoded = verifyToken({token,signature: process.env.TOKEN_SIGNATURE});
    if (!decoded?.ID || !decoded?.isLoggedIn) {
      return res.json({ message: "IN_VALID TOKEN PAYLOAD" });
    }
    const authUser = await userModel.findById(decoded.ID).select("userName email role");
    if (!authUser) {
      return res.json({ message: "not register account" });
    }
    req.user=authUser
    return next();
} catch (error) {
    
      return res.json({ message: "catch error",error:error.stack});
}
}


``
export default auth