import api from "@/app/api";
import prisma from "@/app/api/prisma";
import review from "@/review";
import postText from "@/schema/postText";

export const POST = api(async request => {
    return prisma.post.create({
        data: {text: await review(postText.parse(await request.text()))},
        select: {id: true}
    }).then(({id}) => id)
})