import  express  from "express";
import {getUser, getUserFriends,addRemoveFriend, updateUserProfile} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()
// upload.single("picture"),
 router.get("/:id",verifyToken,getUser)
 router.get("/:id/friends",verifyToken,getUserFriends)
 router.patch("/updateProfile/:id",verifyToken,updateUserProfile)
 router.patch("/:id/friendId",verifyToken,addRemoveFriend)


export default router 