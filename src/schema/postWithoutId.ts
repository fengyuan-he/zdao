import {z} from "zod";
import postText from "@/schema/postText";

export default z.object({
    createdAt: z.string(),
    text: postText
}).strict()