// src/pages/EventsListing.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventDetailModal from "../components/EventDetailModal";
import DOMPurify from "dompurify"; // Ensure DOMPurify is imported for safety, though not directly used in this file.

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events/");
        // Ensure events are sorted by date if not already done by backend
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching all events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {" "}
      {/* Removed pt-20 here, hero will handle spacing */}
      {/* Events Listing Hero/Banner Section - ADDED */}
      <section className="relative h-48 md:h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }} // Your background image
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-2">
            <p className="text-lg md:text-xl font-light text-gold-200 uppercase tracking-wide">
              Pleroma Springs Events
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our Upcoming & Past Events
            </h1>
          </div>
        </div>
      </section>
      {/* Main Events Content Section - Adjusted padding */}
      <section className="py-12 md:py-20">
        {" "}
        {/* This now controls the space *below* the hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* The h1 from here has been moved into the hero section */}

          {events.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => openEventModal(event)}
                  className="block group cursor-pointer"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {event.image && (
                      <div className="h-56 w-full overflow-hidden">
                        <img
                          src={`http://127.0.0.1:8000${event.image}`}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-2xl font-semibold text-teal-800 mb-3 group-hover:text-gold-500 transition-colors">
                        {event.title}
                      </h2>
                      <p className="text-gray-700 text-base mb-4 flex-grow">
                        {event.description.substring(0, 150) + "..."}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-teal-100">
                        <span>
                          {new Date(event.event_date).toLocaleDateString()}
                        </span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">
              No events to display yet.
            </p>
          )}
        </div>
      </section>
      {/* Event Detail Modal */}
      {isModalOpen && selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={closeEventModal} />
      )}
    </div>
  );
};

export default EventsListing;
