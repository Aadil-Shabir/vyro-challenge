import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { headers } from "next/headers";

export async function POST(req: Request, { params }: { params: { token: string } }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const invitation = await prisma.invitation.findUnique({
            where: { token: params.token },
            include: { document: true },
        });

        if (!invitation) {
            return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 400 });
        }

        if (new Date() > invitation.expiresAt) {
            await prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: "expired" },
            });
            return NextResponse.json({ error: "Invitation expired" }, { status: 400 });
        }

        const existingCollab = await prisma.collaboration.findFirst({
            where: { documentId: invitation.documentId, userId: session.user.id },
        });

        if (!existingCollab) {
            await prisma.collaboration.create({
                data: {
                    documentId: invitation.documentId,
                    userId: session.user.id,
                },
            });
        }

        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: "accepted" },
        });

        return NextResponse.json({ message: "Invitation accepted", documentId: invitation.documentId });
    } catch (error) {
        console.error("Error accepting invitation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
