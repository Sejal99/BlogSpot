import mongoose, { Schema } from "mongoose";

const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
  
    createdBy:{
       type: Schema.Types.ObjectId,
       ref:'user',
   
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref:'blog',
    }
},{timestamps:true})

const Comment= mongoose.model('blog',commentSchema)
export default Comment