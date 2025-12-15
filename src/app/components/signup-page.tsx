import { useState } from "react";
import { UserPlus } from "lucide-react";
import { AuthInput } from "./auth-input";
import { Button } from "./ui/button";

interface SignupPageProps {
  onSignup: (email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSignup(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-indigo-900 text-center">Create Account</h1>
            <p className="text-gray-600 text-center mt-2">Join The Scholar Hub</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="University Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="student@university.edu.bd"
            />
            
            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Create a password"
            />
            
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
            />
            
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-6"
              disabled={password !== confirmPassword}
            >
              Sign Up
            </Button>
          </form>
          
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
