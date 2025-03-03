import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <ProtectedRoute>
            <Navbar />
            <div className="flex items-center justify-center w-full h-full min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Real-time Collaborative Editor</h1>
            </div>
        </ProtectedRoute>
    );
}
