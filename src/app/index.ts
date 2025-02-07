import {z, ZodTypeAny} from "zod";
import VError from "verror";

export default function app(value: ZodTypeAny) {
    const schema = z.object({
        value
    }).strict().or(z.object({
        reason: z.object({
            name: z.string(),
            message: z.string(),
            stack: z.string().optional()
        })
    }).strict())
    return async (input: RequestInfo | URL, init?: RequestInit) => {
        const result = schema.parse(await fetch(input, init).then((res) => res.json()))
        if ('reason' in result) {
            const {name, message, stack} = result.reason
            const reason = new Error(message)
            reason.name = name
            const temp = reason.stack
            reason.stack = stack
            const v = new VError(reason, '%s %s', init?.method ?? 'GET', input)
            v.stack = temp
            throw v
        }
        return result.value
    }
}