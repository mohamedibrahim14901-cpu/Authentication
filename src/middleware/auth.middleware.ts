// import Express from "express";
import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

interface AuthRequest extends Request{
    user?:any
}

export const verifyToken=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded =Jwt.verify(token!,process.env.JWT_SECRET as string);
        (req as AuthRequest).user= decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error", error);
        return res.status(403).json({message:"forbidden"})
    }
}
