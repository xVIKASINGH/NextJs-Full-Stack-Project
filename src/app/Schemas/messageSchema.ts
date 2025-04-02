import {z} from "zod"

export const messageSchema=z.object({
   content:z.string().min(1,{message:"content cannot be empty "}).max(200,{message:"content limit is 200 words"})
})