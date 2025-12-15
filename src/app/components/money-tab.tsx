import { useState } from "react";
import { Wallet, Receipt, CreditCard, Plus, Edit } from "lucide-react";
import { AppCard } from "./app-card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BudgetPlannerModal, BudgetPlan } from "./budget-planner-modal";
import { AddExpenseModal, Expense } from "./add-expense-modal";

interface MoneyTabProps {
  budgetPlan: BudgetPlan;
  expenses: Expense[];
  onUpdateBudgetPlan: (plan: BudgetPlan) => void;
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

export function MoneyTab({ budgetPlan, expenses, onUpdateBudgetPlan, onAddExpense }: MoneyTabProps) {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Calculate spending by category
  const categorySpending: Record<string, number> = {};
  expenses.forEach((expense) => {
    categorySpending[expense.category] = (categorySpending[expense.category] || 0) + expense.amount;
  });

  const totalSpent = Object.values(categorySpending).reduce((sum, val) => sum + val, 0);

  // Mock subscriptions
  const subscriptions = [
    { id: "1", name: "Spotify", amount: 199, hasDiscount: true },
    { id: "2", name: "Netflix", amount: 599, hasDiscount: false },
    { id: "3", name: "Amazon Prime", amount: 299, hasDiscount: true },
  ];

  return (
    <div className="pb-24 px-4 pt-6 space-y-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-indigo-900">Money Manager</h1>
        <p className="text-gray-600 mt-1">Track your finances</p>
      </div>

      {/* Monthly Budget Status Card */}
      <AppCard icon={Wallet} title="Monthly Budget Status">
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600 text-sm">Total Monthly Budget</p>
              <p className="text-2xl font-bold text-indigo-900">
                BDT {budgetPlan.totalBudget.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <Button
              onClick={() => setIsPlannerOpen(true)}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Plan
            </Button>
          </div>

          {/* Budget Summary List */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-indigo-900">Budget Summary</h3>
            {Object.entries(budgetPlan.categories).map(([category, planned]) => {
              const spent = categorySpending[category] || 0;
              const progress = planned > 0 ? (spent / planned) * 100 : 0;
              const isOverspent = progress > 100;
              const diff = planned - spent;

              if (planned === 0 && spent === 0) return null;

              return (
                <div key={category} className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{category}</p>
                      <p className="text-sm text-gray-600">
                        Planned: BDT {planned.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    {isOverspent && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                        Overspent
                      </span>
                    )}
                  </div>
                  
                  <Progress
                    value={Math.min(progress, 100)}
                    className={`h-2 mt-2 ${isOverspent ? "[&>div]:bg-red-600" : ""}`}
                  />
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <span className={isOverspent ? "text-red-600" : "text-gray-700"}>
                      Spent: BDT {spent.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={diff < 0 ? "text-red-600" : "text-green-600"}>
                      Diff: BDT {Math.abs(diff).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AppCard>

      {/* Recent Transactions Card */}
      <AppCard icon={Receipt} title="Recent Transactions">
        <div className="mt-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {expenses.slice(0, 10).map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-600">{expense.date} • {expense.category}</p>
                </div>
                <p className="text-red-600 font-semibold">
                  -BDT {expense.amount.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-gray-500 text-center py-4">No transactions yet</p>
            )}
          </div>
          
          <Button
            onClick={() => setIsExpenseModalOpen(true)}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </AppCard>

      {/* Subscription Audit Card */}
      <AppCard icon={CreditCard} title="Subscription Audit">
        <div className="mt-4 space-y-3">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{sub.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    BDT {sub.amount.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month
                  </p>
                </div>
                {sub.hasDiscount && (
                  <div className="bg-red-100 border border-red-300 px-3 py-1 rounded text-xs text-red-700">
                    Student discount available!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      {/* Modals */}
      <BudgetPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        currentPlan={budgetPlan}
        onSave={onUpdateBudgetPlan}
      />

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAdd={onAddExpense}
      />
    </div>
  );
}
