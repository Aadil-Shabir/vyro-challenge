import React from "react";

interface StatusTagProps {
    status: string;
}

const statusStyles: Record<string, string> = {
    accepted: "bg-green-100 text-green-700 border-green-400",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
    expired: "bg-red-100 text-red-700 border-red-400",
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    const defaultStyle = "bg-gray-100 text-gray-700 border-gray-400";
    const appliedStyle = statusStyles[status] || defaultStyle;

    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${appliedStyle}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusTag;
