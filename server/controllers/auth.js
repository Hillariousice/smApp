import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"
import User from "../models/User.js"

export const Register = async(req, res)=>{
    try{
        const {firstName,
             lastName,
             email,
             password,
           confirm_password} = req.body

           const salt = await bcrypt.genSalt()
           const passwordHash = await bcrypt.hash(password,salt)
           const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()* 10000),
            impression: Math.floor(Math.random()* 10000)
           })
           const savedUser = await newUser.save()
           res.status(201).json({
            message:"User register successfully",
            savedUser
           })
    }catch(err){
        res.status(500).json({
            Error:"Internal server Error",
            route:"/auth/register"
        })

    }
}

export const Login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user){

         return res.status(400).json({
        Error:'User does not exist'
      })
        }
        const isMatch = await bcrypt.compare(password,user.password) 
        if(!isMatch)    return res.status(400).json({
            Error:'Invalid credentials'
          })

          const token = jwt.sign({id:user_id},process.env.JWT_SECRET)
          delete user.password
          res.status(200).json({
            message:"User successfully logged in",
            token,
            user

          })
        }catch(err){
        res.status(500).json({
            Error:"Internal server Error",
            route:"/auth/login"
        })
    }
}