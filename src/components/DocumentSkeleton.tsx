import { Skeleton } from "./ui/skeleton";

const DocumentSkeleton = () => {
    return (
        <div className="flex w-full gap-4 flex-col">
            <Skeleton className="w-[200px] h-10" />
            <Skeleton className="w-full sm:min-h-[600px] min-h-[400px]" />
        </div>
    );
};

export default DocumentSkeleton;
