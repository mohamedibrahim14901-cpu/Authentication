import  express  from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import { getUser } from "../controllers/auth.controller.js";

const router=express.Router();

// post /api/auth/register
router.post('/register',registerUser);
// registerUser function in controler

// post /api/auth/login
router.post('/login',loginUser);
// loginUser function in controler


router.get('/protected',verifyToken,(req,res)=>{
res.json({message:"Protected Route",user:(req as any).user})
}) 

router.get('/admin',verifyToken,checkRole(['admin']),(req,res)=>{
res.json({message:"Admin Route Hello"})
}) 

router.get('/me',verifyToken,getUser)


export default router;