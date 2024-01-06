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
        const token = await user.matchPassword(email, password);
console.log('ppppppp',token);

        if (!token) {
            throw new Error('User not found or password does not match');
        }

        // Send the JSON response
        res.status(200).json({ message: 'User signed in' });

        // Check if the response has been sent before setting the cookie
        if (!res.headersSent) {
            res.cookie('token', token);
        }

    } catch (error) {
  console.log(error);
  
    }
});

   


export default userRouter
