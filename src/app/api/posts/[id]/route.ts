import api from "@/app/api";
import prisma from "@/app/api/prisma";
import id from "@/schema/id";

export const GET = api(async (_, value: { id: string }) => {
    return prisma.post.findUniqueOrThrow({
        where: {
            id: id.parse(value.id)
        },
        select: {
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