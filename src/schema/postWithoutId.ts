import {z} from "zod";
import postText from "@/schema/postText";

export default z.object({
    createdAt: z.string(),
    text: postText,
    updatedAt: z.string(),
    _count: z.object({
        Comment: z.number(),
        Reply: z.number()
    }).strict()
}).strict()