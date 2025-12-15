import { useState } from "react";
import { Calendar, MapPin, Clock, UtensilsCrossed } from "lucide-react";
import { AppCard } from "./app-card";
import { Button } from "./ui/button";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  category: string;
  hasFreeFood: boolean;
}

export function TimeTab() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFreeFood, setShowFreeFood] = useState(false);

  // Mock events data
  const allEvents: Event[] = [
    {
      id: "1",
      name: "Career Fair 2024",
      date: "Dec 18, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      category: "Career",
      hasFreeFood: true,
    },
    {
      id: "2",
      name: "Winter Festival",
      date: "Dec 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Campus Grounds",
      category: "Social",
      hasFreeFood: true,
    },
    {
      id: "3",
      name: "ML Workshop",
      date: "Dec 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "CS Building Room 301",
      category: "Academic",
      hasFreeFood: false,
    },
    {
      id: "4",
      name: "Guest Lecture: AI Ethics",
      date: "Dec 23, 2024",
      time: "11:00 AM - 12:30 PM",
      location: "Lecture Hall B",
      category: "Academic",
      hasFreeFood: false,
    },
    {
      id: "5",
      name: "Photography Club Meetup",
      date: "Dec 25, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Student Center",
      category: "Club",
      hasFreeFood: false,
    },
    {
      id: "6",
      name: "Sports Day",
      date: "Dec 27, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Sports Complex",
      category: "Sports",
      hasFreeFood: true,
    },
  ];

  const categories = ["All", "Academic", "Career", "Social", "Club", "Sports"];

  // Filter events
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesFreeFood = !showFreeFood || event.hasFreeFood;
    return matchesCategory && matchesFreeFood;
  });

  return (
    <div className="pb-24 px-4 pt-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-indigo-900">Campus Events</h1>
        <p className="text-gray-600 mt-1">Discover what's happening</p>
      </div>

      {/* Filters */}
      <div className="mb-5">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 hide-scrollbar mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Free Food Toggle */}
        <button
          onClick={() => setShowFreeFood(!showFreeFood)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            showFreeFood
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          Free Food Only
        </button>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-indigo-900">{event.name}</h3>
                <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                  {event.category}
                </span>
              </div>
              {event.hasFreeFood && (
                <div className="bg-green-100 p-2 rounded-full">
                  <UtensilsCrossed className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>

            <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
              View Details
            </Button>
          </div>
        ))}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more events
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
