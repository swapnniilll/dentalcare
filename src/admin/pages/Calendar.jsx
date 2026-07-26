import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./Calendar.css";

const API_BASE_URL = "http://localhost:8081";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [blockedSlots, setBlockedSlots] = useState({});

  // ✅ Fetch blocked slots & auto-refresh every 2s
  useEffect(() => {
    if (!selectedDate) return;
    const fetchBlockedSlots = () => {
      fetch(`${API_BASE_URL}/api/slots/blocked?date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => {
          const slots = {};
          data.forEach((appt) => {
            const slotKey = `${appt.room}_${appt.time}`;
            slots[slotKey] = appt.status; // 👈 use status field directly
          });
          setBlockedSlots(slots);
        })
        .catch(() => setBlockedSlots({}));
    };

    fetchBlockedSlots();
    const interval = setInterval(fetchBlockedSlots, 2000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  return (
    <div className="calendar-page-container">
      <div className="heading-container mb-8">
        <h1>
          <FaRegCalendarAlt className="text-white text-3xl" />
          Available Slots
        </h1>
      </div>

      {/* Date Tabs */}
      <div className="calendar-date-tabs">
        {(() => {
          const dates = [];
          let i = 0;
          while (dates.length < 10) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            const monthName = date.toLocaleDateString("en-US", { month: "short" });
            const dayNum = date.getDate();
            if (date.getDay() !== 0 && date.getDay() !== 1) {
              const formattedDate = date.toISOString().split("T")[0];
              dates.push(
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(formattedDate);
                    setSelectedDay(dayNum);
                    setSelectedMonth(date.getMonth());
                  }}
                  className={`${selectedDate === formattedDate ? "active" : "inactive"}`}
                >
                  <span className="text-sm">{dayName}</span>
                  <span className="text-base font-semibold">{monthName}</span>
                  <span className="text-lg font-bold">{dayNum}</span>
                </button>
              );
            }
            i++;
          }
          return dates;
        })()}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="calendar-room-grid">
          {["Room 1", "Room 2", "Emergency"].map((room) => (
            <div key={room} className="calendar-room">
              <h3>{room}</h3>
              {Array.from({ length: 8 }).map((_, i) => {
                const hour = 10 + i;
                const displayHour = hour > 12 ? hour - 12 : hour;
                const period = hour >= 12 ? "PM" : "AM";
                const time = `${displayHour}:00 ${period}`;
                const slotKey = `${room}_${time}`;

                const status = blockedSlots?.[slotKey];

                let slotClass = "calendar-slot-green"; // Default available
                let slotText = time;

                // Emergency default color
                if (room === "Emergency") {
                  slotClass = "calendar-slot-green";
                }

                // Override based on status
                if (status === "blocked") {
                  slotClass = "calendar-slot-gray";
                  slotText = `${time} 🔒 Not Available`;
                } else if (status === "booked by call") {
                  slotClass = "calendar-slot-yellow";
                  slotText = `${time} 📞 Booked (Call)`;
                } else if (status === "booked") {
                  slotClass = "calendar-slot-red";
                  slotText = `${time} ❌ Booked`;
                }

                return (
                  <div key={slotKey} className={`calendar-slot-button ${slotClass}`}>
                    {slotText}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="admin-footer text-center text-gray-600 mt-10 pt-4 border-t">
        <div>
          &copy; {new Date().getFullYear()} Developed by CDAC All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}