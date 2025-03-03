"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import StatusTag from "./StatusTag";

const formSchema = z.object({
    email: z.string().email(),
});

interface InviteCollaboratorsProps {
    invitations: { email: string; status: string }[];
    docId: string;
    setInvitations: Dispatch<SetStateAction<[] | { email: string; status: string }[]>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const InviteCollaborators = ({ docId, invitations, setInvitations }: InviteCollaboratorsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/documents/${docId}/invite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email }),
            });

            const data = await response.json();
            setIsLoading(false);

            console.log({ data });
            if (response.ok) {
                setInvitations([...invitations, { email: values.email, status: "pending" }]);
                alert("sent");
            } else {
                alert(data.error || "Failed to create document");
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "outline", className: "cursor-pointer" })}>
                Add People <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite Collaborators</DialogTitle>
                    <DialogDescription>
                        You can invite collaborators on the new document and work together.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="umer.janjua@vyro.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="cursor-pointer">
                                {isLoading ? "Sending Invite..." : "Invite"}
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">Invitations</p>
                    <div className="flex flex-col gap-2">
                        {invitations && invitations.length > 0 ? (
                            invitations.map((invitation, index) => (
                                <div
                                    className="flex justify-between py-2 px-2.5 my-1 bg-gray-200 rounded-md"
                                    key={`${index}-${invitation.email}`}
                                >
                                    <p className="text-sm">{invitation.email}</p>
                                    <StatusTag status={invitation.status} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full p-4 justify-center items-center">
                                <p className="text-sm text-center text-muted-foreground">
                                    No collaborator has been invited yet!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteCollaborators;
