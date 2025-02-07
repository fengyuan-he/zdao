import api from "@/app/api";
import prisma from "@/app/api/prisma";
import review from "@/app/review";
import id from "@/schema/id";
import page from "@/schema/page";
import commentText from "@/schema/commentText";

export const POST = api(async request => {
    const {nextUrl: {searchParams}} = request
    return prisma.comment.create({
        data: {postId: id.parse(searchParams.get('postId')), text: await review(commentText.parse(await request.text()))},
        select: {id: true}
    }).then(({id}) => id)
})

export const GET = api(({nextUrl: {searchParams}}) => {
    return prisma.comment.findMany({
        where: {
            postId: id.parse(searchParams.get('postId')),
        },
        orderBy: {
            id: 'desc'
        },
        skip: page.parse(searchParams.get('page')) * 10,
        take: 10,
        select: {
            id: true,
            createdAt: true,
            text: true
        }
    })
})