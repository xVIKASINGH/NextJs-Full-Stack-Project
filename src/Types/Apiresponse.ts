import { Message } from "@/app/model/UserModel";

export interface Apiresponse{
    success:boolean,
    message:string,
    isAcceptingMessages?:boolean
    messages?:Array<Message>
}