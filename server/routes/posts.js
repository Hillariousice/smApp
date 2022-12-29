import  express  from "express";
import { upload } from "../utils/multer.js"
import {CreatePost, getFeedPosts,getUserPosts ,likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

router.post('/posts',verifyToken,upload.single("picture"),CreatePost)

router.get("/",verifyToken,getFeedPosts)
router.get('/:userId/posts',verifyToken,getUserPosts)

router.patch("/:id/like",verifyToken,likePost)

export default router