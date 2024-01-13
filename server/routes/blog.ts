

import express from 'express'
import { verifyJwt } from '../middlewares/authentication'
import multer from 'multer'
import { Request, Response } from 'express';
import path from 'path'


import blog from '../models/blog'

interface CustomRequest extends Request {
    user?: any; // Add the 'user' property to Request
}
const blogRouter= express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //console.log(req.headers['userId']);
      cb(null, path.resolve('./public/uploads/'))
    },
    filename: function (req, file, cb) {
     
        const fileName= `${Date.now()}-${file.originalname}`
      cb(null, fileName) 
    }
  })

  const upload = multer({ storage: storage })

 

blogRouter.get('/all' , async(req, res)=> {
    try{
        const data= await blog.find().populate('createdBy')
      
        res.json(data)
    }catch(err){
        res.status(403).json(err)
    }
})

blogRouter.post('/', verifyJwt , upload.single('file'), async(req,res)=> {
 console.log(req.file);
 console.log(req.body.title);
 
 
 
    try{
        const {title , description}= req.body
         const userId= req.headers['userId']
         console.log('uuuuuuuuu',userId);
         
         console.log('hhhhhhhhhh',req.file?.filename);
         
        const data = await blog.create({
            imageUrl: `/uploads/${req.file?.filename}`,
            title: title,
            description: description,
            createdBy: userId,
        })
        await data.save()
        console.log('kkkkkk',data);
       
       
    res.json('Blog successfully uploaded!')
        
    }catch(err){
        res.json(err)
    }
})

blogRouter.get("/:id", async (req: CustomRequest, res: Response) => {
    try {
        const Blog = await blog.findOne({ _id: req.params.id });
        console.log('ddddddd',Blog);
        

        if (!Blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        return res.json({
            user: req.user,
            Blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default blogRouter