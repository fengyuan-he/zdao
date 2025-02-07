import {z} from "zod";

export default z.coerce.number().int().nonnegative()