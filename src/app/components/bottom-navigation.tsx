import { Home, Wallet, Calendar, Link2 } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "money", label: "Money", icon: Wallet },
    { id: "time", label: "Time", icon: Calendar },
    { id: "connect", label: "Connect", icon: Link2 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-indigo-100" : ""
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
              <span className={`text-xs ${isActive ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
