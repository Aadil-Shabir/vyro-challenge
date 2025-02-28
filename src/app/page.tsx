import Image from "next/image";
import SignIn from "@/components/Signin";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Collaborative Editor</h1>
            <SignIn />
        </div>
    );
}
