import express from "express";

import comment from "../models/comment";
import { verifyJwt } from "../middlewares/authentication";
import blog from "../models/blog";

const commentRouter = express.Router();



commentRouter.post('/:blogId', verifyJwt, async(req,res)=> {
    try{
     const {comments} = req.body
     const postComment= await comment.create({
        comments , blogId: req.params.blogId , userId: req.headers['userId']
    })
    
    res.status(200).json('Comment successfully made!')
    }catch(err){
        res.status(403).json(err)
    }
    
})

commentRouter.get('/:blogId', async(req,res)=> {
    try{
        const userComments = await comment.find({blogId: req.params.blogId}).populate('userId')
        res.json(userComments)
    }catch(err){
        res.status(403).json(err)
    }
})
export default commentRouter;
