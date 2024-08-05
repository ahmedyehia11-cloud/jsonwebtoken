import noteModel from "../../../../DB/model/note.model.js";
import userModel from "../../../../DB/model/user.model.js";



export const getNoteModule = async  (req, res, next) => {
    const getNotes = await noteModel.find().populate({
        path:"userId",
        select:'-password'
    })
    return res.json({ message: "Note module",getNotes })
}

export const addNote = async (req,res,next)=>{
   
try {
     const { title, description, userId } = req.body;
    //    console.log({ title, description, userId });
    const user = await userModel.findById(userId)
    if (!user) {
        return res.json({ message: "In_valid account >ID< "}); 
    }
        const note = await noteModel.create({ title, description, userId });
        return res.json({ message: "done", note }); 
} catch (error) {
            return res.json({ message: "catch error", error }); 
}
}