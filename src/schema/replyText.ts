import {z} from "zod";

export const replyMax = 400
export default z.string().max(replyMax)