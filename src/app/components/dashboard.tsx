import { TrendingUp, Target, CalendarDays } from "lucide-react";
import { AppCard } from "./app-card";
import { Progress } from "./ui/progress";

interface DashboardProps {
  totalBudget: number;
  totalSpent: number;
  savingsGoals: Array<{ id: string; name: string; target: number; current: number }>;
  upcomingEvents: Array<{ id: string; name: string; date: string; time: string; tag: string }>;
}

export function Dashboard({ totalBudget, totalSpent, savingsGoals, upcomingEvents }: DashboardProps) {
  const remainingBudget = totalBudget - totalSpent;
  const isOverspent = remainingBudget < 0;
  
  // Calculate overall savings progress
  const totalSavingsTarget = savingsGoals.reduce((acc, goal) => acc + goal.target, 0);
  const totalSavingsCurrent = savingsGoals.reduce((acc, goal) => acc + goal.current, 0);
  const savingsProgress = totalSavingsTarget > 0 ? (totalSavingsCurrent / totalSavingsTarget) * 100 : 0;

  return (
    <div className="pb-24 px-4 pt-6 space-y-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-indigo-900">The Scholar Hub</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Financial Snapshot Card */}
      <AppCard icon={TrendingUp} title="Quick Financial Snapshot">
        <div className="mt-4">
          <p className="text-gray-600 text-sm mb-2">Remaining Budget This Month</p>
          <p className={`text-4xl font-bold ${isOverspent ? "text-red-600" : "text-green-600"}`}>
            BDT {Math.abs(remainingBudget).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {isOverspent && <p className="text-red-600 text-sm mt-1">Overspent</p>}
          <p className="text-gray-500 text-sm mt-2">
            Out of BDT {totalBudget.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </AppCard>

      {/* Savings Goals Card */}
      <AppCard icon={Target} title="Savings Goals">
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="text-indigo-600 font-semibold">{savingsProgress.toFixed(1)}%</span>
          </div>
          <Progress value={savingsProgress} className="h-3 mb-3" />
          <p className="text-gray-700">
            BDT {totalSavingsCurrent.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} of BDT {totalSavingsTarget.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          
          {savingsGoals.length > 0 && (
            <div className="mt-4 space-y-3">
              {savingsGoals.slice(0, 3).map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="border-t pt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{goal.name}</span>
                      <span className="text-gray-600">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </AppCard>

      {/* Upcoming Events Card */}
      <AppCard icon={CalendarDays} title="Upcoming Events">
        <div className="mt-4 space-y-3">
          {upcomingEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <p className="font-semibold text-indigo-900">{event.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {event.date} • {event.time}
                </p>
              </div>
              <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full whitespace-nowrap">
                {event.tag}
              </span>
            </div>
          ))}
          {upcomingEvents.length === 0 && (
            <p className="text-gray-500 text-center py-4">No upcoming events</p>
          )}
        </div>
      </AppCard>
    </div>
  );
}
