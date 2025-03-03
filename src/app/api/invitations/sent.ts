import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        const invitations = await prisma.invitation.findMany({
            where: {
                invitedById: userId,
            },
            include: {
                document: {
                    select: { title: true },
                },
            },
        });

        return NextResponse.json(invitations);
    } catch (error) {
        console.error("Error fetching invitations:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
