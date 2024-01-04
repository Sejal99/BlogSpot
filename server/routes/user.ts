import express from 'express'

//const router=Router();
import user from '../models/user'


const userRouter= express.Router()

userRouter.post('/signup' , async (req, res)=> {
    console.log('jjjjj',req.body);
    
    try{
        const {fullName, email, password, role} = req.body
        const ExistingUser=await user.findOne({fullName,email});
        
        if(ExistingUser) {
            console.log('kkkkkkkkkkkkkkkkkkkkkooooooooooooooooooo');
            
            return res.json('user already exists')
            
        }
        const data= await user.create({
            fullName , email, password, role
        })
   console.log('kkkkkkk',data);
   
        res.json('User created successfully!')
    }catch(err){
        res.status(403).json(err)
    }
})

userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const fuser = await user.matchPassword(email,password); // Use the model to call the static method
       // console.log(fuser);
        
        if (!fuser) {
            throw new Error('User not found or password does not match');
        }

        res.status(200).json('user signed in' );
    } catch (error) {
        res.status(403).json({ error});
    }
});


export default userRouter
