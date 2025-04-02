import {z} from "zod"

export const usernamevalidation=z.string().min(3,"Minumum 3 character is required").max(10,"Username must be less than 20 characters")
.regex(/^[a-z0-9]+$/,"username must not contain special character")


export const signupSchema=z.object({
    username:usernamevalidation,
    email:z.string().email({message:"You entered invalid email address"}),
    password:z.string().min(6,{message:"Password must be 6 digit long"}).max(12,{message:"Password not more than 12 digit long"})
})