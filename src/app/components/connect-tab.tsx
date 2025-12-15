import { User, AlertTriangle, Phone } from "lucide-react";
import { AppCard } from "./app-card";
import { Button } from "./ui/button";

interface ConnectTabProps {
  userEmail: string;
}

export function ConnectTab({ userEmail }: ConnectTabProps) {
  // Mock alerts
  const alerts = [
    {
      id: "1",
      title: "Campus Closure",
      message: "University will be closed on Dec 16 for Victory Day",
      isUrgent: true,
      date: "Dec 14, 2024",
    },
    {
      id: "2",
      title: "Exam Schedule Released",
      message: "Final exam schedule for Fall 2024 is now available on the portal",
      isUrgent: false,
      date: "Dec 12, 2024",
    },
    {
      id: "3",
      title: "Library Hours Extended",
      message: "Central library will be open until 11 PM during exam week",
      isUrgent: false,
      date: "Dec 10, 2024",
    },
    {
      id: "4",
      title: "Weather Alert",
      message: "Heavy rain expected tomorrow. Classes may be rescheduled.",
      isUrgent: true,
      date: "Dec 9, 2024",
    },
  ];

  // Essential contacts
  const contacts = [
    { id: "1", service: "Campus Security", phone: "+880-2-9876543" },
    { id: "2", service: "Academic Advising", phone: "+880-2-9876544" },
    { id: "3", service: "Health Center", phone: "+880-2-9876545" },
    { id: "4", service: "IT Help Desk", phone: "+880-2-9876546" },
    { id: "5", service: "Student Services", phone: "+880-2-9876547" },
  ];

  // Get user initials
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="pb-24 px-4 pt-6 space-y-5 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-indigo-900">Campus Resources</h1>
        <p className="text-gray-600 mt-1">Stay connected</p>
      </div>

      {/* Profile Card */}
      <AppCard icon={User} title="Profile">
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">{getInitials(userEmail)}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Authenticated User</p>
            <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
          </div>
        </div>
      </AppCard>

      {/* Campus Alerts Card */}
      <AppCard icon={AlertTriangle} title="Campus Alerts">
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl ${
                alert.isUrgent
                  ? "bg-red-50 border-l-4 border-red-600"
                  : "bg-gray-50 border-l-4 border-indigo-600"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-semibold ${
                        alert.isUrgent ? "text-red-900" : "text-gray-900"
                      }`}
                    >
                      {alert.title}
                    </h3>
                    {alert.isUrgent && (
                      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      {/* Essential Contacts Card */}
      <AppCard icon={Phone} title="Essential Contacts">
        <div className="mt-4 space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{contact.service}</p>
                <p className="text-sm text-gray-600 mt-1">{contact.phone}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => window.open(`tel:${contact.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );
}
