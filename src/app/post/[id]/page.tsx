import Comments from "@/components/Comments";
import id from "@/schema/id";

export default async function Home({params}: { params: Promise<{ id: string }> }) {
    return <Comments id={id.parse((await params).id)}/>
}