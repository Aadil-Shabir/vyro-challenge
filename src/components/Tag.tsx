import { cn } from "@/lib/utils";

interface TagProps {
    name: "Owner" | "Collaborator";
}

const Tag = ({ name }: TagProps) => {
    return (
        <span
            className={cn(
                "text-xs border p-1 rounded-full",
                name === "Owner" ? "border-green-500 text-green-600" : "border-blue-500 text-blue-600"
            )}
        >
            {name}
        </span>
    );
};

export default Tag;
