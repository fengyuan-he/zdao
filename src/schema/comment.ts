import {z} from "zod";
import commentText from "@/schema/commentText";
import time from "@/schema/time";

export default z.object({
    id: time,
    createdAt: z.string(),
    text: commentText,
    updatedAt: z.string(),
    _count: z.object({
        Reply: z.number()
    }).strict()
}).strict()