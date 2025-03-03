import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { buttonVariants } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import NewDocument from "@/components/NewDocument";
import Documents from "@/components/Documents";

export default function Dashboard() {
    const newDocId = uuidv4();

    return (
        <ProtectedRoute>
            <Navbar />
            <div className="flex w-full h-full min-h-screen gap-4 flex-col lg:px-10 lg:py-6 py-4 px-4">
                <div className="flex gap-4 items-start">
                    <h1 className="text-2xl font-bold mb-4">Your Documents</h1>
                    <NewDocument />
                </div>

                <Documents />
            </div>
        </ProtectedRoute>
    );
}
