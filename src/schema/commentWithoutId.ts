import {z} from "zod";
import postText from "@/schema/postText";
import post from "@/schema/post";

export default z.object({
    createdAt: z.string(),
    text: postText,
    Post: post,
    updatedAt: z.string(),
    _count: z.object({
        Reply: z.number()
    }).strict()
}).strict()