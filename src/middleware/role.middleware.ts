import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request{
    user?:any;
}

export const checkRole=(roles:String[])=>{
    return (req:AuthRequest,res:Response, next:NextFunction):any=>{
        if (!roles.includes(req.user?.role)) {
            res.status(403).json({message: 'Forbidden'});
            return;
        }
        next();
    }
}