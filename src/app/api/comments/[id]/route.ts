import api from "@/app/api";
import prisma from "@/app/api/prisma";
import id from "@/schema/id";

export const GET = api(async (_, value: { id: string }) => {
    return prisma.comment.findUniqueOrThrow({
        where: {
            id: id.parse(value.id)
        },
        select: {
            createdAt: true,
            text: true,
            Post: {
                select: {
                    id: true,
                    createdAt: true,
                    text: true
                }
            }
        }
    })
})