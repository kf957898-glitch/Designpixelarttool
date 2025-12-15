import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface BudgetPlan {
  totalBudget: number;
  categories: Record<string, number>;
}

interface BudgetPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: BudgetPlan;
  onSave: (plan: BudgetPlan) => void;
}

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Books & Supplies",
  "Entertainment",
  "Health & Wellness",
  "Clothing",
  "Utilities",
  "Other",
];

export function BudgetPlannerModal({ isOpen, onClose, currentPlan, onSave }: BudgetPlannerModalProps) {
  const [totalBudget, setTotalBudget] = useState(currentPlan.totalBudget);
  const [allocations, setAllocations] = useState<Record<string, number>>(currentPlan.categories);

  useEffect(() => {
    setTotalBudget(currentPlan.totalBudget);
    setAllocations(currentPlan.categories);
  }, [currentPlan]);

  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const remaining = totalBudget - totalAllocated;
  const isOverAllocated = remaining < 0;

  const handleSave = () => {
    if (!isOverAllocated) {
      onSave({ totalBudget, categories: allocations });
      onClose();
    }
  };

  const updateAllocation = (category: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAllocations((prev) => ({ ...prev, [category]: numValue }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-indigo-900">Monthly Budget Plan</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div>
            <Label htmlFor="total-budget">Total Monthly Budget</Label>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600">BDT</span>
              <Input
                id="total-budget"
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                className="flex-1"
                step="0.01"
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl ${isOverAllocated ? "bg-red-50" : "bg-green-50"}`}>
            <p className="text-sm text-gray-700 mb-1">Remaining to Allocate</p>
            <p className={`text-2xl font-bold ${isOverAllocated ? "text-red-600" : "text-green-600"}`}>
              BDT {Math.abs(remaining).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {isOverAllocated && (
              <p className="text-red-600 text-sm mt-1">Over-allocated by this amount</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-indigo-900 mb-3">Category Allocations</h3>
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div key={category}>
                  <Label htmlFor={category} className="text-sm">{category}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-600 text-sm">BDT</span>
                    <Input
                      id={category}
                      type="number"
                      value={allocations[category] || 0}
                      onChange={(e) => updateAllocation(category, e.target.value)}
                      className="flex-1"
                      step="0.01"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isOverAllocated}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400"
          >
            Save Budget Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
