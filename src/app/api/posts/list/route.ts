import api from "@/app/api";
import prisma from "@/app/api/prisma";
import page from "@/schema/page";

export const GET = api(async request => {
    const {nextUrl: {searchParams}} = request
    return prisma.post.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        skip: page.parse(searchParams.get('page')) * 10,
        take: 10,
        select: {
            id: true,
            createdAt: true,
            text: true,
            updatedAt: true,
            _count: {
                select: {
                    Comment: true,
                    Reply: true
                }
            }
        }
    })
})