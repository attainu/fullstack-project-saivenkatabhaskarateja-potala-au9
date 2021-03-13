import mongoose from 'mongoose'
import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import User from '../models/userModel.js'

const userRouter = express.Router()

userRouter.get("/seed",expressAsyncHandler(async(req,res)=>{
    // User.remove({},(err,response)=>{
    //     if(err) throw err;
    //     res.send(response)
    // })
    
    //  User.insertMany(data.users, (err, response) => {
    //    if(err){
    //       return res.send({ message: err.message });
           
    //    }  
    //    res.send(response);
    //  });
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
})
)

export default userRouter