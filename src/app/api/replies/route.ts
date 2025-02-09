import api from "@/app/api";
import prisma from "@/app/api/prisma";
import review from "@/review";
import id from "@/schema/id";
import page from "@/schema/page";
import commentText from "@/schema/commentText";

export const POST = api(async request => {
    const {nextUrl: {searchParams}} = request
    const comment = await prisma.comment.update({
        where: {
            id: id.parse(searchParams.get('commentId')),
        },
        data: {
            updatedAt: new Date()
        },
        select: {
            id: true,
            postId: true,
        }
    })
    const post = await prisma.post.update({
        where: {
            id: comment.postId
        },
        data: {
            updatedAt: new Date()
        },
        select: {
            id: true
        }
    })
    return prisma.reply.create({
        data: {
            postId: post.id,
            commentId: comment.id,
            text: await review(commentText.parse(await request.text()))
        },
        select: {id: true}
    }).then(({id}) => id)
})

export const GET = api(({nextUrl: {searchParams}}) => {
    return prisma.reply.findMany({
        where: {
            commentId: id.parse(searchParams.get('commentId')),
        },
        orderBy: {
            updatedAt: 'desc'
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