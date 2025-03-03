import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
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
            include: {
                owner: true,
                collaborators: {
                    include: { user: true },
                },
            },
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const isOwner = document.ownerId === session.user.id;
        const isCollaborator = document.collaborators.some((collab) => collab.userId === session.user.id);

        if (!isOwner && !isCollaborator) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(document, { status: 200 });
    } catch (error) {
        console.error("Error fetching document:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
