import api from "@/app/api";
import prisma from "@/app/api/prisma";
import id from "@/schema/id";
import page from "@/schema/page";

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