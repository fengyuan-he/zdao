import Replies from "@/components/Replies";
import id from "@/schema/id";

export default async function Home({params}: { params: Promise<{ id: string }> }) {
    return <Replies id={id.parse((await params).id)}/>
}