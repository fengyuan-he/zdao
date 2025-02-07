import {NextRequest, NextResponse} from "next/server";

export default function api<T, V>(handler: (request: NextRequest, value: V) => Promise<T>) {
    return (request: NextRequest, {params}: { params: Promise<V> }) =>
        (params ?? Promise.resolve())
            .then(value => handler(request, value))
            .then(value => ({value}))
            .catch(reason => {
                if (reason instanceof Error) {
                    const {name, message, stack} = reason
                    return {reason: {name, message, stack}}
                }
                return {reason: {name: 'UnknownError', message: String(reason)}}
            })
            .then(value => NextResponse.json(value))
}