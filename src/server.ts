// Authentication => email password 
// Authorization => roles 

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import authRoutes from '../src/routes/auth.routes.js'

dotenv.config();
const app=express();
const port = process.env.PORT || 5000;

connectDB();

// middleware
app.use(express.json());
app.use("/api/auth",authRoutes)

app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`);
    
})
