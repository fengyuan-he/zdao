import {Card, CardContent, CardHeader, Link} from "@mui/material";
import MDX from "@/components/MDX";

export default function Post({id, createdAt, text, updatedAt, _count}: {
    id?: number
    createdAt: string
    text: string
    updatedAt: string
    _count: {
        Comment: number
        Reply: number
    }
}) {
    return (
        <Card>
            <CardHeader
                title={id && <Link href={`/post/${id}`}>{`>${id}`}</Link>}
                subheader={`创建于 ${new Date(createdAt).toLocaleString()}，${_count.Comment + _count.Reply} 条更新于 ${new Date(updatedAt).toLocaleString()}`}
            />
            <CardContent>
                <MDX>{text}</MDX>
            </CardContent>
        </Card>
    )
}