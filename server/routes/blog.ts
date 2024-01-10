

import express from 'express'
import { verifyJwt } from '../middlewares/authentication'
import multer from 'multer'
import blog from '../models/blog'
import path from 'path'
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
        console.log('kkkkkk',data);
        res.json({ message: 'File uploaded successfully' });
        
        await data.save()
       

    res.send('Blog successfully uploaded!')
        
    }catch(err){
        res.json(err)
    }
})

export default blogRouter