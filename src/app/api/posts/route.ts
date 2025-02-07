import api from "@/app/api";
import prisma from "@/app/api/prisma";
import review from "@/app/api/review";
import postText from "@/schema/postText";
import page from "@/schema/page";

export const POST = api(async request => {
    return prisma.post.create({
        data: {text: await review(postText.parse(await request.text()))},
        select: {id: true}
    }).then(({id}) => id)
})

export const GET = api(async request => {
    const {nextUrl: {searchParams}} = request
    return prisma.post.findMany({
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