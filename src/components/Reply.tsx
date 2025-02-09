import {Card, CardContent, CardHeader} from "@mui/material";
import MDX from "@/components/MDX";

export default function Reply({id, createdAt, text}: {
    id: number
    createdAt: string
    text: string
}) {
    return (
        <Card>
            <CardHeader
                title={`&${id}`}
                subheader={`创建于 ${new Date(createdAt).toLocaleString()}`}
            />
            <CardContent>
                <MDX>{text}</MDX>
            </CardContent>
        </Card>
    )
}