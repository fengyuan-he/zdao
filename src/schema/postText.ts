import {z} from "zod";

export const postMax = 1600
export default z.string().max(postMax)