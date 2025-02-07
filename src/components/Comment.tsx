import {Card, CardContent, CardHeader} from "@mui/material";
import {useMemo} from "react";
import MDX from "@/components/MDX";

export default function Comment({id, createdAt, text}: {
    id: number
    createdAt: string
    text: string
}) {
    const time = useMemo(() => new Date(createdAt).toLocaleString(), [createdAt])
    return (
        <Card>
            <CardHeader title={`#${id}`} subheader={time}/>
            <CardContent>
                <MDX>{text}</MDX>
            </CardContent>
        </Card>
    )
}