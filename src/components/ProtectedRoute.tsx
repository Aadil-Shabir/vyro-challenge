"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (isPending) return;

        console.log({ session });

        if (!session?.user) {
            router.push("/signin");
        }
    }, [session, isPending, router]);

    if (!session?.user) return null;

    return <>{children}</>;
}
