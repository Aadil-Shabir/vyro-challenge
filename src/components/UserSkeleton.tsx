import { Skeleton } from "@/components/ui/skeleton";

const UserSkeleton = () => {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[180px]" />
                <Skeleton className="h-4 w-[130px]" />
            </div>
        </div>
    );
};

export default UserSkeleton;
