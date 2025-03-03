import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { headers } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const documentId = params.id;

        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: { owner: true },
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const isOwner = document.ownerId === session.user.id;
        const isCollaborator = await prisma.collaboration.findFirst({
            where: { documentId, userId: session.user.id },
        });

        if (!isOwner && !isCollaborator) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const collaborators = await prisma.collaboration.findMany({
            where: { documentId },
            include: {
                user: {
                    select: { id: true, name: true, email: true, image: true },
                },
            },
        });

        return NextResponse.json(collaborators.map((c) => c.user));
    } catch (error) {
        console.error("Error fetching collaborators:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
