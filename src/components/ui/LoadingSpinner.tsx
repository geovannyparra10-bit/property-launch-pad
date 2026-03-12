import { Loader as Loader2 } from "lucide-react";

interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({ size = "md", className = "" }: Props) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-slate-600`} />
    </div>
  );
}

export function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        {message && <p className="text-slate-700 font-medium">{message}</p>}
      </div>
    </div>
  );
}
