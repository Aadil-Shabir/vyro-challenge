import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
    const response = await sendEmail({
        to: "aadil.shabir14@gmail.com",
        subject: "Test Email from Next.js",
        html: "<p>This is a test email!</p>",
    });

    return NextResponse.json(response);
}
