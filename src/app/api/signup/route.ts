import ConnecttoDb from "@/lib/dbConnect";

import UserModel from "@/app/model/UserModel";

import { sendVerificationEmail } from "@/helpers/sendVerificationCode";
import bcrypt from 'bcryptjs';




export async function POST(request:Request){
    await ConnecttoDb()
    try {
         const {username,email,password}=await request.json()
        const userregisteredandverifed= await UserModel.findOne({
           username,
            isverified:true,
         })
      if(userregisteredandverifed){
        return Response.json({
            success:false,
            message:"User already registered",
        },{
            status:403
        })
      }
      const existingUserByemail=await UserModel.findOne({email})
      const verifycode=Math.floor(100000+Math.random()*900000).toString();
      if(existingUserByemail){
        if(existingUserByemail.isverified){
            return Response.json(
                {
                    success:false,
                    message:"User already exist with this email",
        
                },{status:500}
            )
        }else{
            const hash=await bcrypt.hash(password,10);
            existingUserByemail.password=hash;
            existingUserByemail.verifycode=verifycode;
            existingUserByemail.verifycodeExpiry=new Date(Date.now()+3600000)

            await existingUserByemail.save();
        }
      }else{
     
        const hashed_password=await bcrypt.hash(password,10);
        const expirydate=new Date();
        expirydate.setHours(expirydate.getHours()+1)
         const newuser=new UserModel({
             username,
             email,
             password:hashed_password,
             isverified:false,
            verifycode,
             verifycodeExpiry:expirydate,
             isAcceptingMessage:false,
             Message:[]
         })
         await newuser.save();
      }
      const emailResponse=await sendVerificationEmail(
        email,
        username,
        verifycode,
      )
      if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message,

        },{status:500})
      }
      return Response.json({
        success:true,
        message:"User registered Successfully",

    },{status:201})
    } catch (error) {
        console.error("Error while registring user",error)
       return Response.json(
        {
         success:false,
         message:"User registered successfully"
       },
       {
        status:500,
       }
    )
    }
}