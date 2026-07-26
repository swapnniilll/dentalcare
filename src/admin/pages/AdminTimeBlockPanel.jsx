import React, { useState, useEffect } from 'react'; 
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdminTimeBlockPanel.css';

const API_BASE_URL = 'http://localhost:8081';

export default function AdminTimeBlockPanel() {
  const [selectedDate, setSelectedDate] = useState('');
  const [blockedSlots, setBlockedSlots] = useState({});
  const [showOptions, setShowOptions] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState("info"); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    room: '',
  });

  const rooms = ['Room 1', 'Room 2', 'Emergency'];

  const times = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + i;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? 'PM' : 'AM';
    return `${displayHour}:00 ${period}`;
  });

  const saturdayTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

  const getFilteredTimes = () => {
    if (!selectedDate) return times;
    const day = new Date(selectedDate).getDay();
    if (day === 6) return saturdayTimes;
    return times;
  };

  const filteredTimes = getFilteredTimes();

  // fetch blocked slots (auto-refresh every 3s)
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = () => {
      fetch(`${API_BASE_URL}/api/slots/blocked?date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => {
          const slots = {};
          data.forEach(({ room, time, status }) => {
            slots[`${room}_${time}`] = status;
          });
          setBlockedSlots(slots);
        })
        .catch((err) => console.error(err));
    };

    fetchSlots();
    const interval = setInterval(fetchSlots, 3000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  // toggle Not Available
  const handleMakeUnavailable = async (room, time) => {
    const key = `${room}_${time}`;

    await fetch(`${API_BASE_URL}/api/slots/block`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, room, time }),
    });

    setBlockedSlots((prev) => ({ ...prev, [key]: 'blocked' }));
    setShowOptions(null);
  };

  // toggle Available
  const handleMakeAvailable = async (room, time) => {
    const key = `${room}_${time}`;

    await fetch(`${API_BASE_URL}/api/slots/unblock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, room, time }),
    });

    setBlockedSlots((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setShowOptions(null);
  };

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  // ✅ Handle "Booked Over Call" form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointment/book-by-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        const key = `${formData.room}_${formData.time}`;
        setBlockedSlots((prev) => ({ ...prev, [key]: "booked by call" }));

        setPopupMessage("✅ Appointment booked & email sent successfully!");
        setPopupType("success");

        setFormData({
          firstName: "",
          lastName: "",
          dob: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          room: "",
        });
        setShowForm(null);
      } else {
        setPopupMessage("❌ Error: " + result.message);
        setPopupType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setPopupMessage("⚠️ Something went wrong. Please try again.");
      setPopupType("error");
    }
  };

  return (
    <div className="contacts-container bg-white p-6 rounded-xl shadow-md border border-gray-200 fade-in">
      {/* Heading */}
      <div className="heading-container mb-8">
        <h1>Time Slot Management</h1>
      </div>

      {/* Date Picker */}
      <div className="mb-6 flex items-center flex-wrap gap-4">
        <label htmlFor="date-picker" className="text-lg font-semibold text-gray-700 min-w-[110px]">
          Select Date:
        </label>
        <div className="relative w-[250px]">
          <ReactDatePicker
            id="date-picker"
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={(date) => {
              if (!date || !(date instanceof Date)) {
                setSelectedDate("");
                return;
              }
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              setSelectedDate(`${year}-${month}-${day}`);
            }}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
            dateFormat="yyyy-MM-dd"
            placeholderText="Choose a date"
            popperPlacement="bottom-start"
            withPortal
          />
        </div>
      </div>

      {/* Slots Grid */}
      {selectedDate && (
        <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-6xl mx-auto mt-6 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border border-gray-300">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-4 text-left border-r border-gray-300">Time</th>
                  {rooms.map((room) => (
                    <th key={room} className="py-3 px-4 text-center font-semibold border-r border-gray-300">
                      {room}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTimes.map((time) => (
                  <tr key={time} className="border-t border-gray-200">
                    <td className="py-2 px-4 font-medium text-gray-700 border-r border-gray-200">{time}</td>
                    {rooms.map((room) => {
                      const key = `${room}_${time}`;
                      const status = blockedSlots[key];

                      let buttonText = '🟢 Available';
                      let bgColor = 'bg-green-500 hover:bg-green-600 text-black';

                      if (status === 'blocked') {
                        buttonText = '🔒 Not Available';
                        bgColor = 'bg-gray-600 hover:bg-gray-700 text-white';
                      } else if (status === 'booked by call') {
                        buttonText = '📞 Booked (Call)';
                        bgColor = 'bg-yellow-600 hover:bg-yellow-800 text-white';
                      } else if (status === 'booked') {
                        buttonText = '🔒 Booked (Online)';
                        bgColor = 'bg-red-600 hover:bg-red-800 text-white';
                      }

                      return (
                        <td key={key} className="py-2 px-2 text-center border-r border-gray-200 relative">
                          <button
                            onClick={() => setShowOptions(showOptions === key ? null : key)}
                            className={`w-full py-1 rounded-md transition duration-200 text-sm font-semibold ${bgColor}`}
                          >
                            {buttonText}
                          </button>

                          {showOptions === key && (
                            <div className="absolute z-10 bg-white border shadow rounded-md mt-1 w-44 left-1/2 -translate-x-1/2">

                              {status === undefined && (
                                <>
                                  <button
                                    onClick={() => handleMakeUnavailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🔒 Not Available
                                  </button>

                                  <button
                                    onClick={() => {
                                      setShowOptions(null);
                                      setShowForm(key);
                                      setFormData((prev) => ({
                                        ...prev,
                                        date: selectedDate,
                                        time,
                                        room,
                                      }));
                                    }}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    📞 Booked Over Call
                                  </button>
                                </>
                              )}

                              {status === 'blocked' && (
                                <>
                                  <button
                                    onClick={() => handleMakeAvailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🟢 Available
                                  </button>

                                  <button
                                    onClick={() => {
                                      setShowOptions(null);
                                      setShowForm(key);
                                      setFormData((prev) => ({
                                        ...prev,
                                        date: selectedDate,
                                        time,
                                        room,
                                      }));
                                    }}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    📞 Booked Over Call
                                  </button>
                                </>
                              )}

                              {status === 'booked' && (
                                <>
                                  <button
                                    onClick={() => handleMakeAvailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🟢 Available
                                  </button>

                                  <button
                                    onClick={() => handleMakeUnavailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🔒 Not Available
                                  </button>
                                </>
                              )}

                              {status === 'booked by call' && (
                                <>
                                  <button
                                    onClick={() => handleMakeAvailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🟢 Available
                                  </button>

                                  <button
                                    onClick={() => handleMakeUnavailable(room, time)}
                                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                                  >
                                    🔒 Not Available
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[550px] relative animate-fadeIn">
            <button
              onClick={() => setShowForm(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
              📞 Booked Slot (Over Call)
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex items-center gap-1">
                <label className="w-32 text-sm font-semibold text-gray-700">
                  First Name :
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-1">
                <label className="w-32 text-sm font-semibold text-gray-700">
                  Last Name :
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-1">
                <label className="w-32 text-sm font-semibold text-gray-700">
                  Date of Birth :
                </label>
                <ReactDatePicker
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={(date) => {
                    if (!date) return;
                    const formatted = date.toLocaleDateString("en-US");
                    setFormData({ ...formData, dob: formatted });
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-1">
                <label className="w-32 text-sm font-semibold text-gray-700">
                  Email :
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-1">
                <label className="w-32 text-sm font-semibold text-gray-700">
                  Phone :
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="text-sm text-gray-700 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg mt-4">
                Booking for <b className="text-blue-700">{formData.room}</b> at{' '}
                <b className="text-blue-700">{formData.time}</b> on{' '}
                <b className="text-blue-700">{formData.date}</b>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium"
                >
                  ✅ Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {popupMessage && (
        <div className="popup-overlay">
          <div className={`popup-box ${popupType}`}>
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage(null)}>OK</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="admin-footer text-center text-gray-600 mt-10 pt-4 border-t">
        <div>&copy; {new Date().getFullYear()} Developed by CDAC All Rights Reserved.</div>
      </footer>
    </div>
  );
}