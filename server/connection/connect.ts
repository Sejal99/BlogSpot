import mongoose from "mongoose";
const dotenv =require("dotenv")
dotenv.config()
const connectDb= async()=>{
    try{
        const db= await mongoose.connect('mongodb+srv://sejal8974:44YL2wWqsI8PWAIK@cluster0.eg5zq.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to DB');
        
    }catch(err){
        console.log(err);
        
    }
}

export default connectDb