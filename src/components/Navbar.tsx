"use client";

import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserSkeleton from "./UserSkeleton";
import { TbLogout } from "react-icons/tb";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
    const { data, isPending } = useSession();
    const userName = data?.user.name || "User";
    const userImage = data?.user.image;

    return (
        <nav className="bg-gray-100 shadow-md w-full z-50 mb-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/">
                    <span className="text-xl font-bold">Vyro</span>
                </Link>

                <Link href="/dashboard" className="font-medium">
                    Documents
                </Link>

                {isPending ? (
                    <UserSkeleton />
                ) : data?.user ? (
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={userImage ?? ""} alt={userName} />
                                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p>{userName}</p>
                        </div>
                        <TbLogout onClick={() => signOut()} className="cursor-pointer text-red-400" />
                    </div>
                ) : (
                    <Link href="/signin" className={buttonVariants({})}>
                        Sign in
                    </Link>
                )}
            </div>
        </nav>
    );
}
