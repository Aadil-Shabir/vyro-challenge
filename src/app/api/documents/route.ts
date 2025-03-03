import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/db";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const documents = await prisma.document.findMany({
            where: {
                OR: [{ ownerId: session.user.id }, { collaborators: { some: { userId: session.user.id } } }],
            },
            include: {
                owner: true,
                collaborators: {
                    include: { user: true },
                },
            },
        });

        return NextResponse.json(documents, { status: 200 });
    } catch (error) {
        console.error("Error fetching documents:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content } = await req.json();
        if (!title || !content) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const document = await prisma.document.create({
            data: {
                title,
                ownerId: session.user.id,
                content,
            },
        });

        return NextResponse.json(document, { status: 201 });
    } catch (error) {
        console.error("Error creating document:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
