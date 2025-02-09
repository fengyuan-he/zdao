import {z} from "zod";

export const commentMax = 800
export default z.string().max(commentMax)