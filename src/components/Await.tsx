import {ReactNode, useCallback, useEffect, useState} from "react";
import Report from "@/components/Report";
import {Skeleton} from "@mui/material";

export default function Await<T>({fn, children}: {
    fn: () => Promise<T>,
    children: (res: T) => ReactNode
}) {
    const [value, setValue] = useState<Error | { res: T }>()
    const handler = useCallback(() => {
            fn()
                .then(res => setValue({res}))
                .catch(reason => setValue(reason instanceof Error ? reason : new Error(String(reason))))
        },
        [fn, setValue])
    useEffect(() => {
        handler()
    }, [handler])
    const handleRetry = () => {
        setValue(undefined)
        handler()
    }
    if (value instanceof Error) return <Report error={value} onRetry={handleRetry}/>
    if (value === undefined) return <Skeleton/>
    return children(value.res)
}