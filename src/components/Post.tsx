import {Card, CardContent, CardHeader, Link} from "@mui/material";
import {useMemo} from "react";
import MDX from "@/components/MDX";

export default function Post({id, createdAt, text}: {
    id: number
    createdAt: string
    text: string
}) {
    const time = useMemo(() => new Date(createdAt).toLocaleString(), [createdAt])
    return (
        <Card>
            <CardHeader title={<Link href={`/post/${id}`}>{`>${id}`}</Link>} subheader={time}/>
            <CardContent>
                <MDX>{text}</MDX>
            </CardContent>
        </Card>
    )
}