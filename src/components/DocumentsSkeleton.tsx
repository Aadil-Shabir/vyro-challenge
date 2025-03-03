import { Skeleton } from "@/components/ui/skeleton";

const DocumentsSkeleton = () => {
    return (
        <div className="w-full grid grid-cols-12 gap-4">
            <Skeleton className="col-span-4 h-10 w-full" />
            <Skeleton className="col-span-4 h-10 w-full" />
            <Skeleton className="col-span-4 h-10 w-full" />
            <Skeleton className="col-span-4 h-10 w-full" />
            <Skeleton className="col-span-4 h-10 w-full" />
        </div>
    );
};

export default DocumentsSkeleton;
