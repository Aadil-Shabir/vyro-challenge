"use client";

import CollaborativeEditor from "@/components/CollaborativeEditor";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Document } from "@prisma/client";
import DocumentSkeleton from "@/components/DocumentSkeleton";
import InviteCollaborators from "@/components/InviteCollaborators";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DocumentPage() {
    const params = useParams();
    const docId = params?.id as string;

    const { data, isPending } = useSession();
    const userId = data?.user.id;

    const [document, setDocument] = useState<Document | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [invitations, setInvitations] = useState<{ email: string; status: string }[] | []>([]);
    const [isInvitationLoading, setIsInvitationLoading] = useState<boolean>(true);

    const [collaborators, setCollaborators] = useState<
        { image: string; email: string; id: string; name: string }[] | []
    >([]);
    const [isCollaboratorsLoading, setIsCollaboratorsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDocument = async () => {
            const response = await fetch(`/api/documents/${docId}`);
            const data = await response.json();
            if (response.ok) {
                setDocument(data);
            } else {
                console.error("Failed to fetch document:", data.error);
            }
            setIsLoading(false);
        };

        fetchDocument();
    }, []);

    useEffect(() => {
        const fetchInvitations = async () => {
            const response = await fetch(`/api/invitations/${docId}`);
            const data = await response.json();
            if (response.ok) {
                setInvitations(data);
            } else {
                console.error("Failed to fetch Invitations:", data.error);
            }
            setIsInvitationLoading(false);
        };

        fetchInvitations();
    }, []);

    useEffect(() => {
        const fetchCollaborators = async () => {
            const response = await fetch(`/api/documents/${docId}/collaborators`);
            const data = await response.json();
            if (response.ok) {
                console.log({ data });
                setCollaborators(data);
            } else {
                console.error("Failed to fetch Collaborators:", data.error);
            }
            setIsCollaboratorsLoading(false);
        };

        fetchCollaborators();
    }, []);

    console.log({ document });

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="flex w-full h-full min-h-screen gap-4 flex-col lg:px-10 lg:py-6 py-4 px-4">
                {isLoading ? (
                    <DocumentSkeleton />
                ) : !document ? (
                    <p>Document not found</p>
                ) : (
                    <>
                        <div className="w-full flex sm:justify-between justify-center items-center sm:flex-row flex-col">
                            <p className="text-xl font-semibold mb-2">
                                Editing Document: <span className="font-bold text-blue-900">{document.title}</span>
                            </p>
                            {document.ownerId === userId && (
                                <InviteCollaborators
                                    docId={docId}
                                    invitations={invitations}
                                    isLoading={isInvitationLoading}
                                    setInvitations={setInvitations}
                                    setIsLoading={setIsInvitationLoading}
                                />
                            )}
                        </div>

                        {document.ownerId === userId && (
                            <div className="flex items-center gap-3 py-2">
                                <p className="text-lg font-semibold">Collaborators:</p>
                                {isCollaboratorsLoading ? (
                                    <p className="text-gray-500">Loading...</p>
                                ) : collaborators.length > 0 ? (
                                    <TooltipProvider>
                                        <div className="flex space-x-3">
                                            {collaborators.map((collaborator) => (
                                                <Tooltip key={collaborator.id}>
                                                    <TooltipTrigger>
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage
                                                                src={collaborator.image}
                                                                alt={collaborator.name}
                                                            />
                                                            <AvatarFallback>
                                                                {collaborator.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{collaborator.email}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </TooltipProvider>
                                ) : (
                                    <p className="text-gray-500">No collaborators yet</p>
                                )}
                            </div>
                        )}

                        <CollaborativeEditor docId={docId} />
                    </>
                )}
            </div>
        </ProtectedRoute>
    );
}
