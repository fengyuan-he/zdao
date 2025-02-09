import {z} from "zod";
import time from "@/schema/time";
import replyText from "@/schema/replyText";

export default z.object({
    id: time,
    createdAt: z.string(),
    text: replyText
}).strict()