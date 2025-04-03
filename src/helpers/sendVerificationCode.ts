import { resend } from "@/lib/resend";
import VerificationEmail from "../../Emails/EmailComponent";
import { Apiresponse } from "@/Types/Apiresponse";



export async function sendVerificationEmail(
    email:string,
    username:string,
    verifycode:string,
    

):Promise<Apiresponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Hello world',
            react: VerificationEmail({ username,otp:verifycode }),
          });
        return {success:true,message:"Verfication Email send succesfully"}
    } catch (Emailerror) {
        console.error("Error while sending email",Emailerror)
        return {success:false,message:"Failed to send verification code"}
    }
}