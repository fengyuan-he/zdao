import {z} from "zod";
import postText from "@/schema/postText";
import time from "@/schema/time";

export default z.object({
    id: time,
    createdAt: z.string(),
    text: postText,
    updatedAt: z.string(),
    _count: z.object({
        Comment: z.number(),
        Reply: z.number()
    }).strict()
}).strict()