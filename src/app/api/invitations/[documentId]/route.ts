import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { headers } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { documentId } = params;

        const document = await prisma.document.findUnique({
            where: { id: documentId, ownerId: userId },
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found or access denied" }, { status: 403 });
        }

        const invitations = await prisma.invitation.findMany({
            where: { documentId },
            select: {
                id: true,
                email: true,
                status: true,
                expiresAt: true,
                createdAt: true,
            },
        });

        return NextResponse.json(invitations);
    } catch (error) {
        console.error("Error fetching invitations:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
