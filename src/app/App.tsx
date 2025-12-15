import { useState, useEffect } from "react";
import { LoginPage } from "./components/login-page";
import { SignupPage } from "./components/signup-page";
import { Dashboard } from "./components/dashboard";
import { MoneyTab } from "./components/money-tab";
import { TimeTab } from "./components/time-tab";
import { ConnectTab } from "./components/connect-tab";
import { BottomNavigation } from "./components/bottom-navigation";
import { BudgetPlan } from "./components/budget-planner-modal";
import { Expense } from "./components/add-expense-modal";

type AuthView = "login" | "signup" | "authenticated";

interface AppState {
  budgetPlan: BudgetPlan;
  expenses: Expense[];
  savingsGoals: Array<{ id: string; name: string; target: number; current: number }>;
}

export default function App() {
  const [authView, setAuthView] = useState<AuthView>("login");
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  // Load state from localStorage
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem("scholarHubState");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      budgetPlan: {
        totalBudget: 30000,
        categories: {
          "Food & Dining": 8000,
          "Transportation": 4000,
          "Books & Supplies": 5000,
          "Entertainment": 3000,
          "Health & Wellness": 2000,
          "Clothing": 2000,
          "Utilities": 3000,
          "Other": 3000,
        },
      },
      expenses: [
        {
          id: "1",
          date: "2024-12-14",
          description: "Lunch at cafeteria",
          category: "Food & Dining",
          amount: 250,
        },
        {
          id: "2",
          date: "2024-12-13",
          description: "Bus fare",
          category: "Transportation",
          amount: 50,
        },
        {
          id: "3",
          date: "2024-12-12",
          description: "Course textbook",
          category: "Books & Supplies",
          amount: 1500,
        },
        {
          id: "4",
          date: "2024-12-11",
          description: "Movie tickets",
          category: "Entertainment",
          amount: 600,
        },
        {
          id: "5",
          date: "2024-12-10",
          description: "Dinner with friends",
          category: "Food & Dining",
          amount: 800,
        },
      ],
      savingsGoals: [
        { id: "1", name: "Laptop Fund", target: 50000, current: 15000 },
        { id: "2", name: "Summer Trip", target: 20000, current: 8000 },
        { id: "3", name: "Emergency Fund", target: 10000, current: 6000 },
      ],
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("scholarHubState", JSON.stringify(appState));
  }, [appState]);

  // Mock upcoming events
  const upcomingEvents = [
    { id: "1", name: "Career Fair 2024", date: "Dec 18", time: "10:00 AM", tag: "Career" },
    { id: "2", name: "Winter Festival", date: "Dec 20", time: "6:00 PM", tag: "Social" },
    { id: "3", name: "ML Workshop", date: "Dec 22", time: "2:00 PM", tag: "Academic" },
    { id: "4", name: "Guest Lecture: AI Ethics", date: "Dec 23", time: "11:00 AM", tag: "Academic" },
  ];

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setAuthView("authenticated");
    setActiveTab("home");
  };

  const handleSignup = (email: string, password: string) => {
    setUserEmail(email);
    setAuthView("authenticated");
    setActiveTab("home");
  };

  const handleUpdateBudgetPlan = (plan: BudgetPlan) => {
    setAppState((prev) => ({ ...prev, budgetPlan: plan }));
  };

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setAppState((prev) => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses],
    }));
  };

  const totalSpent = appState.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (authView === "login") {
    return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView("signup")} />;
  }

  if (authView === "signup") {
    return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setAuthView("login")} />;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {activeTab === "home" && (
        <Dashboard
          totalBudget={appState.budgetPlan.totalBudget}
          totalSpent={totalSpent}
          savingsGoals={appState.savingsGoals}
          upcomingEvents={upcomingEvents}
        />
      )}

      {activeTab === "money" && (
        <MoneyTab
          budgetPlan={appState.budgetPlan}
          expenses={appState.expenses}
          onUpdateBudgetPlan={handleUpdateBudgetPlan}
          onAddExpense={handleAddExpense}
        />
      )}

      {activeTab === "time" && <TimeTab />}

      {activeTab === "connect" && <ConnectTab userEmail={userEmail} />}

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
