import {Schema,Document, mongo} from "mongoose"
import mongoose from "mongoose"

export interface Message extends Document{
    content:string,
    createdAt:Date
}


const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
  username:string,
  email:string,
  password:string,
  isverified:boolean
  verifycode:string,
  verifycodeExpiry:Date,
  isAcceptingMessage:boolean,
  Message:Message[]

}

const UserSchema:Schema<User>=new Schema({
  username:{
    type:String,
    required:[true,"Username is Required"],
    unique:true,
    trim:true,

  },
  email:{
    type:String,
    required:true,

  },
  password:{
    type:String,
    required:true,
  },
  isAcceptingMessage:{
    type:Boolean,
  },
  verifycode:{
    type:String,
    required:[true,"Verifycode is required"]},

  verifycodeExpiry:{
    type:Date,
    required:[true,"VerifycodeExpiry is required"]},
 
    Message:[MessageSchema],
   isverified:{
    type:Boolean,
    required:true
   }
})

 const UserModel=(mongoose.models.User) || mongoose.model("User",UserSchema)

 export default UserModel;