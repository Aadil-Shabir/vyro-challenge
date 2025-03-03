"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Document } from "@prisma/client";
import DocumentsSkeleton from "./DocumentsSkeleton";
import Tag from "./Tag";

const Documents = () => {
    const { data: session } = useSession();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch("/api/documents");
            const data = await response.json();
            if (response.ok) {
                setDocuments(data);
            } else {
                console.error("Failed to fetch documents:", data.error);
            }
            setLoading(false);
        };

        fetchDocuments();
    }, []);

    return (
        <div className="w-full">
            {loading ? (
                <DocumentsSkeleton />
            ) : documents.length === 0 ? (
                <p>No documents found. Create one to get started!</p>
            ) : (
                <ul className="grid grid-cols-12 gap-4">
                    {documents.map((doc: Document) => (
                        <li
                            key={doc.id}
                            className="p-4 border border-gray-200 bg-gray-50 rounded-2xl md:col-span-4 col-span-12"
                        >
                            <Link href={`/document/${doc.id}`} className="text-black flex gap-4 items-start">
                                <span className="font-bold text-lg">{doc.title}</span>
                                <Tag name={doc.ownerId === session?.user.id ? "Owner" : "Collaborator"} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Documents;
