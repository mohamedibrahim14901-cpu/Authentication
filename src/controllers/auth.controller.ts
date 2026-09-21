// import  Request from "express";
// import  Response  from "express";
import Express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

interface AuthRequest extends Request{
    user?:any
}

export const registerUser= async (req:Request, res:Response):Promise<any>=>{
    try {
        const {email,password,role}= req.body;

        if (!email || !password) {
            return res.status(400).json({message:"Pleas provide email and password"});
        }

        const existingEmail= await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message:"user already exists"})
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const newUser= await User.create({
            email,
            password:hashedPassword,
            role: role || 'user'
        })

        return res.status(201).json({message:"User created successfully",user:newUser})

    } catch (error) {
        console.error("Errog registering user:",error );
        return res.status(500).json({message:"internal server error"})
    }

}

export const loginUser=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password}=req.body;

        if (!email || !password) {
            return res.status(400).json({message:"Please enter mail and password"});
        }

        const user =await User.findOne({email});
        if (!user) {
            return res.status(400).json({message:"Invalid Email or Password"})
        }

        const isMatched = await bcrypt.compare(password,user.password!);
        if (!isMatched) {
            return res.status(400).json({message:"Invalid Email or Password"})
        }

        const token = jwt.sign({userID:user._id,role:user.role},
            process.env.JWT_SECRET || "Zamalek@1911",
            {expiresIn:"1h"}
        )

return res.status(200).json({message:"Login Succeeded",
    token,
    user:user
})


    } catch (error) {
        console.error("Error logging in user: ",error)
    }
}


export const getUser=async (req:AuthRequest,res:Response):Promise<any>=>{
    try {
        const userID=req.user.userID;
        const user =await User.findById(userID).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    
    } catch (error) {
        console.error("Error getting user: ",error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }



}
