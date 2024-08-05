import { Schema , model } from "mongoose";

const userSchema = new Schema ({


userName:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true,
},
age:{
    type:Number,
    default:"20"
},
salary:Number,
confirmPassword:{
    type:String,
    default:false
},
gender:{
    type:String,
    default:"male",
    enum:["male","female"]

}
},{timestamps:true})



const userModel = model ('User',userSchema)

export default userModel 