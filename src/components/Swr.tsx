import useSWR from "swr";
import {ReactNode, useMemo} from "react";
import Report from "@/components/Report";
import {LinearProgress} from "@mui/material";
import {z, ZodTypeAny} from "zod";
import app from "@/app";

export default function Swr<Z extends ZodTypeAny>({url, value, children}: {
    url: string
    value: Z
    children: (res: z.infer<Z>) => ReactNode
}) {
    const {data, error, mutate, isLoading} = useSWR(url, useMemo(() => app(value), [value]))
    if (error) return <Report error={error} onRetry={mutate}/>
    if (isLoading) return <LinearProgress/>
    return children(data)
}