import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface AppCardProps {
  icon?: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}

export function AppCard({ icon: Icon, title, children, className = "" }: AppCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-6 h-6 text-indigo-600" />}
        <h2 className="font-bold text-indigo-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}
