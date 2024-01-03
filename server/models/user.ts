import mongoose, { Model,Document } from "mongoose";
import { createHmac , randomBytes } from "crypto";


interface User extends Document{ 
    fullName: string;
    email:string;
    password:string;
    role:string;
    salt:string;
}

interface UserModel extends Model<User> {
    matchPassword( email:string,  password:string):Promise<User | null>
}

const userSchema= new mongoose.Schema<User,UserModel>({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    
    },
    salt:{
        type:String,
       
    },
    
    
},{timestamps:true})

userSchema.pre<User>('save', function (next){
    const user= this;
    console.log(user);
    
    if(!user.isModified("password")) {return}
    const secret= randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', secret).update(user.password).digest('hex');
   // console.log(hashedPassword);
    
    this.salt = secret
    this.password = hashedPassword
    next()
})


userSchema.static('matchPassword', async function( email , password){
    const user= await this.findOne({email})
    if(!user){
        throw new Error('User not found')
    }
    const secret= user.salt
    const hashedPassword= user.password
    const hashingPassword= createHmac('sha256', secret).update(password).digest('hex');
    if(hashedPassword !== hashingPassword){
        return null
    }


})

const user= mongoose.model<User,UserModel>('user', userSchema)

export default user