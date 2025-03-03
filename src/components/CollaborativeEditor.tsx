"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const CollaborativeEditor = ({ docId }: { docId: string }) => {
    const [provider, setProvider] = useState<WebsocketProvider | null>(null);
    const [ydoc] = useState(new Y.Doc());

    useEffect(() => {
        if (!docId) return;

        const wsProvider = new WebsocketProvider(
            "ws://localhost:1234",
            docId,
            ydoc
        );

        setProvider(wsProvider);

        return () => {
            wsProvider.destroy();
        };
    }, [docId, ydoc]);

    useEffect(() => {
        if (provider) {
            const user = {
                name: "User " + Math.floor(Math.random() * 100),
                color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            };

            provider.awareness.setLocalState({
                user: user,
            });
        }
    }, [provider]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Collaboration.configure({ document: ydoc }),
            ...(provider
                ? [
                      CollaborationCursor.configure({
                          provider: provider,
                          user: {
                              name: "User Name",
                              color: "#f783ac", 
                          },
                      }),
                  ]
                : []),
        ],
        editorProps: {
            attributes: {
                class: "border rounded-lg p-4 min-h-[300px] focus:outline-none",
            },
        },
    });

    if (!provider || !editor) {
        return <p>Loading editor...</p>;
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <EditorContent editor={editor} />
        </div>
    );
};

export default CollaborativeEditor;
