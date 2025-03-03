import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { headers } from "next/headers";
import { sendEmail } from "@/lib/email";
import { randomUUID } from "crypto";

const EXPIRATION_HOURS = 24;

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const document = await prisma.document.findUnique({
            where: { id: params.id },
            include: { owner: true },
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        if (document.ownerId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const token = randomUUID();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + EXPIRATION_HOURS);

        await prisma.invitation.create({
            data: {
                email,
                documentId: document.id,
                invitedById: session.user.id,
                token,
                expiresAt,
            },
        });

        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;

        await sendEmail({
            to: email,
            subject: "You’ve been invited to collaborate!",
            html: `<p>${session.user.name} invited you to collaborate on "${document.title}".</p>
                   <p><a href="${inviteLink}">Click here to accept</a> (expires in ${EXPIRATION_HOURS} hours).</p>`,
        });

        return NextResponse.json({ message: "Invitation sent successfully" });
    } catch (error) {
        console.error("Error inviting user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
