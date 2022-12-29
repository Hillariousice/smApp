import { Promise } from "mongoose"
import User from "../models/User.js"


export const getUser = async(req,res)=>{
    try{
        const {id} = req.params.id
        const user = await User.findById(id)
        return res.status(200).json({
            message:"You have successfully retrieved",
           user
          })

    }catch(err){
        res.status(404).json({
            Error:"Internal server Error",
            route:"/users/:id"
        })
    }
}
export const updateUserProfile = async(req,res)=>{
    try{
        const {id} = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({
                message:"You are not authorized to update your profile"
              })
        }
        const updateUser = await User.findByIdAndUpdate(id,{
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
        },{new:true})
        if(updateUser){
            return res.status(200).json({
                message:"You have successfully retrieved",
               user
              })
        }

    }catch(err){
        res.status(404).json({
            Error:"Internal server Error",
            route:"/users/updateprofile/:id"
        })
    }
}


export const getUserFriends =async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id)
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )
        const formattedFriends = friends.map(({_id,firstName,lastName,
            email,picturePath,location,
            occupation})=>{ return {_id,firstName,lastName,
                email,picturePath,location,
                occupation}})
                return res.status(200).json({
                    message:"You have successfully retrieved friends",
                 formattedFriends
                  })
    }catch(err){
        res.status(404).json({
            Error:"Internal server Error",
            route:"/users/:id/friends"
        })
    }
}


export const addRemoveFriend = async(req,res)=>{
    try{
        const {id, friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
     if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((id)=> id!== friendId)
        friend.friends  = friend.friends.filter((id)=> id!== id)
     }else{
        user.friends.push(friendId)
        friend.friends.push(id)
     }
     await user.save()
     await friend.save()
     const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
    )
    const formattedFriends = friends.map(({_id,firstName,lastName,
        email,picturePath,location,
        occupation})=>{ return {_id,firstName,lastName,
            email,picturePath,location,
            occupation}})
            return res.status(200).json({
                message:"You have successfully retrieved friends",
             formattedFriends
              })
    }catch(err){
        res.status(404).json({
            Error:"Internal server Error",
            route:"/users/:id/friendId"
        })
    }
    }
