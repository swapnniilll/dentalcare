import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AnimatedDOBPicker from "./AnimatedDOBPicker";
import "./Appointment.css";
import {
  FaUser,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaKey,
  FaCheckCircle
} from 'react-icons/fa';

const API_BASE_URL = "http://localhost:8081";

function AlertModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 p-6 text-center">
        <p className="text-gray-800 text-lg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-r from-[#003BC4] to-[#00B7AA] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function Appointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [existingPatient, setExistingPatient] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Registration (new patient) OTP state
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
  });

  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Existing Patient (Yes flow) OTP state
  const [existingEmail, setExistingEmail] = useState("");
  const [existingOtp, setExistingOtp] = useState("");
  const [existingSending, setExistingSending] = useState(false);
  const [existingVerifying, setExistingVerifying] = useState(false);
  const [existingVerified, setExistingVerified] = useState(false);
  const [existingOtpFieldVisible, setExistingOtpFieldVisible] = useState(false);
  const [existingTimer, setExistingTimer] = useState(0);
  const [existingIntervalId, setExistingIntervalId] = useState(null);
  const [existingLookingUp, setExistingLookingUp] = useState(false);

  const showMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const currentYear = new Date().getFullYear();

  // ✅ Returns { startHour, endHour } for a given date, matching the
  // existing Saturday-vs-weekday slot logic used throughout this page
  const getClinicHours = (dateObj) => {
    const day = dateObj.getDay();
    if (day === 6) {
      return { startHour: 9, endHour: 12 }; // Saturday
    }
    return { startHour: 10, endHour: 17 }; // Tue–Fri
  };

  // ✅ Checks whether the given date is today AND the current time is
  // past that day's closing hour
  const isPastClosingTimeToday = (selectedDateStr) => {
    if (!selectedDateStr) return false;

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    if (selectedDateStr !== todayStr) return false;

    const { endHour } = getClinicHours(now);
    return now.getHours() >= endHour;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  // Send OTP for existing patient (email-only flow)
  const sendExistingOtp = async () => {
    if (!existingEmail) return showMessage("Enter email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(existingEmail)) return showMessage("Enter valid email");

    setExistingSending(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: existingEmail }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setExistingOtpFieldVisible(true);
        showMessage("✅ OTP sent successfully!");

        setExistingTimer(120);

        if (existingIntervalId) clearInterval(existingIntervalId);

        const id = setInterval(() => {
          setExistingTimer((prev) => {
            if (prev <= 1) {
              clearInterval(id);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setExistingIntervalId(id);
      } else {
        showMessage(data.message || "Failed to send OTP");
      }
    } catch {
      showMessage("Error sending OTP");
    }

    setExistingSending(false);
  };

  // Verify OTP for existing patient, then look up their record
  const verifyExistingOtp = async () => {
    if (!existingEmail || !existingOtp) return showMessage("Enter email and OTP");

    setExistingVerifying(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: existingEmail, otp: existingOtp }),
      });
      const data = await res.json();

      if (data.status === "success") {
        setExistingVerified(true);
        showMessage("🎉 OTP Verified!");

        setExistingLookingUp(true);
        try {
          const lookupRes = await fetch(
            `${API_BASE_URL}/api/patient/find-by-email?email=${encodeURIComponent(existingEmail)}`
          );
          const lookupData = await lookupRes.json();

          if (lookupData.success) {
            setPatientData({
              firstName: lookupData.patient.firstName,
              lastName: lookupData.patient.lastName,
              dob: lookupData.patient.dob,
              phone: lookupData.patient.phone,
              email: lookupData.patient.email,
            });
            setTimeout(() => setShowCalendar(true), 600);
          } else {
            setAlertMessage("⚠️ No account found with this email. Please register below.");
            setTimeout(() => setExistingPatient("no"), 1500);
          }
        } catch (err) {
          console.error("Error looking up patient:", err);
          showMessage("Error retrieving your details. Try again.");
        }
        setExistingLookingUp(false);
      } else {
        showMessage(data.message || "Invalid OTP");
      }
    } catch {
      showMessage("Error verifying OTP");
    }

    setExistingVerifying(false);
  };

  // Registration (new patient) — unchanged
  const sendOtp = async () => {
    if (!formData.email) return showMessage("Enter email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return showMessage("Enter valid email");

    setSending(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setOtpFieldVisible(true);
        showMessage("✅ OTP sent successfully!");

        setTimer(120);

        if (intervalId) clearInterval(intervalId);

        const id = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(id);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setIntervalId(id);
      } else {
        showMessage(data.message || "Failed to send OTP");
      }
    } catch {
      showMessage("Error sending OTP");
    }

    setSending(false);
  };

  const verifyOtp = async () => {
    if (!formData.email || !otp) return showMessage("Enter email and OTP");

    setVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setVerified(true);
        showMessage("🎉 OTP Verified!");
      } else {
        showMessage(data.message || "Invalid OTP");
      }
    } catch {
      showMessage("Error verifying OTP");
    }
    setVerifying(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime,
          selectedRoom,
          year: currentYear
        })
      });

      const result = await response.json();
      if (result.success) {
        setAlertMessage('✅ Registered Successfully!');

        setExistingPatient("yes");
        setPatientData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          phone: formData.phone,
          email: formData.email
        });
        setShowCalendar(true);

        setFormData({
          firstName: '',
          lastName: '',
          dob: '',
          email: '',
          phone: ''
        });
        setSelectedTime("");
        setSelectedRoom("");
      } else {
        setAlertMessage('❌ Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('❌ An error occurred. Please try again later.');
    }
  };

  const [blockedSlots, setBlockedSlots] = useState({});

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBlockedSlots = async () => {
      const year = currentYear;
      const month = selectedMonth + 1;
      const day = selectedDay.toString().padStart(2, "0");
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day}`;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/slots/blocked?date=${formattedDate}`
        );
        const data = await response.json();

        const blockedMap = {};
        data.forEach(({ room, time, status }) => {
          blockedMap[`${room}_${time}`] = status;
        });

        setBlockedSlots(blockedMap);
      } catch (error) {
        console.error("Failed to fetch blocked slots:", error);
      }
    };

    fetchBlockedSlots();
    const interval = setInterval(fetchBlockedSlots, 2000);
    return () => clearInterval(interval);
  }, [selectedDate, selectedMonth, selectedDay]);

  const fianlbooked = async () => {
    const fullData = {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      dob: patientData.dob,
      date: selectedDate,
      time: selectedTime,
      room: selectedRoom,
      email: patientData.email,
      phone: patientData.phone,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointment/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      const result = await response.json();
      console.log("DB Result:", result);

      if (result.success) {
        setAlertMessage("🎉 Appointment booked successfully! A confirmation email has been sent to your registered email address.");
        setPatientData({
          firstName: "",
          lastName: "",
          dob: "",
          email: "",
          phone: "",
        });
        setSelectedDate("");
        setSelectedTime("");
        setSelectedRoom("");
      } else {
        setAlertMessage(result.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Something went wrong. Please try again.");
    }
  };

  const hiddenDateRef = useRef(null);

  const isRegisterRequiredFilled =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.dob.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  // Reset existing-patient flow when switching radio buttons
  const handleExistingPatientChange = (value) => {
    setExistingPatient(value);
    setShowCalendar(false);
    setExistingEmail("");
    setExistingOtp("");
    setExistingVerified(false);
    setExistingOtpFieldVisible(false);
    setExistingTimer(0);
    if (existingIntervalId) clearInterval(existingIntervalId);
  };

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative w-full h-[550px] flex flex-col items-center justify-center text-center bg-cover bg-center px-4 sm:px-6"
        style={{ backgroundImage: "url('/appointmentBanner1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-3xl text-white px-4 font-poppins">
          <h2 className="text-[42px] sm:text-[56px] md:text-[64px] lg:text-[70px] font-bold leading-tight mb-2">
            Book an Appointment
          </h2>
          <div className="flex justify-center mb-4">
            <div className="h-0.5 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[490px] bg-white rounded-full"></div>
          </div>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed">
            Schedule your visit with ease and experience expert dental care at your convenience.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-[#e0f7ff] to-[#c2e9fb] p-6 flex flex-col lg:flex-row items-start justify-center gap-10">
        <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-3xl px-10 py-12 w-full max-w-xl animate-fade-in">
          <h2 className="text-center text-3xl font-bold text-[#003BC4] mb-6">
            Are you an existing patient?
          </h2>

          {/* Radio Buttons */}
          <div className="flex justify-center gap-8 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="existing"
                value="yes"
                onChange={() => handleExistingPatientChange("yes")}
                checked={existingPatient === "yes"}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="existing"
                value="no"
                onChange={() => handleExistingPatientChange("no")}
                checked={existingPatient === "no"}
              />
              No
            </label>
          </div>

          {/* Existing Patient — Email + OTP only */}
          {existingPatient === "yes" && !showCalendar && (
            <div className="space-y-6 text-sm md:text-base">
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Email Address<span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center border rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm flex-1">
                    <FaEnvelope className="text-[#00B7AA] mr-2 text-sm" />
                    <input
                      type="email"
                      value={existingEmail}
                      onChange={(e) => setExistingEmail(e.target.value)}
                      required
                      disabled={existingVerified}
                      className={`w-full bg-transparent focus:outline-none text-gray-800 text-sm ${
                        existingVerified ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      placeholder="Enter your registered email"
                    />
                  </div>

                  {!existingVerified && (
                    <button
                      type="button"
                      onClick={sendExistingOtp}
                      disabled={existingSending || existingTimer > 0}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50 whitespace-nowrap"
                    >
                      {existingTimer > 0
                        ? `Resend in ${existingTimer}s`
                        : existingSending
                        ? "Sending..."
                        : "Send OTP"}
                    </button>
                  )}
                </div>
                <small className="text-green-600">
                  Once OTP is verified, you'll continue to book your appointment ✅
                </small>
              </div>

              {/* OTP Field */}
              {existingOtpFieldVisible && !existingVerified && (
                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Enter OTP<span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center border rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm flex-1">
                      <FaKey className="text-[#00B7AA] mr-3 text-sm" />
                      <input
                        type="text"
                        value={existingOtp}
                        onChange={(e) => setExistingOtp(e.target.value)}
                        maxLength="6"
                        required
                        className="w-full bg-transparent focus:outline-none text-gray-800 text-sm"
                        placeholder="Enter OTP"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={verifyExistingOtp}
                      disabled={existingVerifying || existingLookingUp}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {existingVerifying || existingLookingUp ? "..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

              {existingVerified && (
                <p className="mt-2 text-green-600 text-sm font-medium">
                  🎉 Email Verified Successfully! Loading your details...
                </p>
              )}
            </div>
          )}

          {/* Calendar Section */}
          {showCalendar && (
            <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto mt-6">
              <h2 className="text-2xl font-bold text-center mb-4">Book a Date and Time:</h2>

              {/* Date Tabs (25 days, skip Sun & Mon) */}
              <div className="flex gap-3 mb-6 overflow-x-auto px-2">
                {(() => {
                  const dates = [];
                  let i = 0;

                  while (dates.length < 25) {
                    const date = new Date();
                    date.setDate(date.getDate() + i);

                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
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
                          className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[80px] border font-medium transition ${
                            selectedDate === formattedDate
                              ? 'bg-[#003BC4] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-[#003BC4] hover:text-white'
                          }`}
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

              {/* Calendar Section */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="date-picker"
                    className="text-lg font-semibold text-gray-700 min-w-[120px]"
                  >
                    Select Date:
                  </label>

                  <div className="relative w-[260px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                      📅
                    </span>

                    <ReactDatePicker
                      id="date-picker"
                      selected={
                        selectedDate
                          ? new Date(
                              selectedDate.split("-")[0],
                              selectedDate.split("-")[1] - 1,
                              selectedDate.split("-")[2]
                            )
                          : null
                      }
                      onChange={(date) => {
                        if (!date) return;

                        const day = date.getDay();
                        if (day === 0 || day === 1) return;

                        const y = date.getFullYear();
                        const m = String(date.getMonth() + 1).padStart(2, "0");
                        const d = String(date.getDate()).padStart(2, "0");

                        const formatted = `${y}-${m}-${d}`;

                        setSelectedDate(formatted);
                        setSelectedDay(date.getDate());
                        setSelectedMonth(date.getMonth());
                      }}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      filterDate={(d) => {
                        const day = d.getDay();
                        return day !== 0 && day !== 1;
                      }}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl shadow-md 
                                 focus:border-[#003BC4] focus:outline-none transition-all text-gray-700 font-medium"
                      calendarClassName="rounded-xl shadow-xl border border-gray-200 p-2"
                      dayClassName={(date) =>
                        date.getDay() === 0 || date.getDay() === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-blue-200 rounded-md transition"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ✅ Time Slots — with after-hours guard */}
              {isPastClosingTimeToday(selectedDate) ? (
                <div className="mt-8 text-center bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">
                    Booking Closed for Today
                  </h3>
                  <p className="text-red-600 max-w-md mx-auto">
                    Our clinic hours for today have ended
                    {selectedDate && new Date(selectedDate).getDay() === 6
                      ? " (9:00 AM – 12:00 PM on Saturdays)"
                      : " (10:00 AM – 5:00 PM)"}
                    . Please select another available date above to book your appointment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-5">
                  {["Room 1", "Room 2", "Emergency"].map((room) => (
                    <div key={room}>
                      <h3 className="text-lg font-semibold mb-2 text-center">{room}</h3>

                      {(() => {
                        const dateObj = selectedDate ? new Date(selectedDate) : null;
                        const day = dateObj ? dateObj.getDay() : null;

                        let startHour, endHour;
                        if (day === 6) {
                          startHour = 9;
                          endHour = 12;
                        } else {
                          startHour = 10;
                          endHour = 17;
                        }

                        const totalSlots = endHour - startHour + 1;

                        const now = new Date();
                        const todayStr = now.toISOString().split("T")[0];
                        const isToday = selectedDate === todayStr;
                        const currentHour = now.getHours();

                        return Array.from({ length: totalSlots }).map((_, i) => {
                          const hour = startHour + i;
                          const displayHour = hour > 12 ? hour - 12 : hour;
                          const period = hour >= 12 ? "PM" : "AM";
                          const time = `${displayHour}:00 ${period}`;
                          const slotKey = `${room}_${time}`;

                          const status = blockedSlots?.[slotKey];

                          // Disable individual slots that have already passed today
                          const isPastSlotToday = isToday && hour <= currentHour;

                          let bgColor = "bg-green-600 hover:bg-green-700 text-white";
                          let buttonText = time;

                          if (room === "Emergency") {
                            bgColor = "bg-green-600 hover:bg-green-700 text-white";
                          }

                          if (isPastSlotToday) {
                            bgColor = "bg-gray-400 text-white";
                            buttonText = `${time} (Passed)`;
                          } else if (status === "blocked") {
                            bgColor = "bg-gray-600 text-white";
                            buttonText = `${time} (Not Available)`;
                          } else if (status === "booked by call") {
                            bgColor = "bg-yellow-600 hover:bg-yellow-800 text-white";
                            buttonText = `${time} (Booked By Call)`;
                          } else if (status === "booked") {
                            bgColor = "bg-red hover:bg-red-800 text-white";
                            buttonText = `${time} (Booked Online)`;
                          }

                          const isSelected = selectedTime === time && selectedRoom === room;
                          const selectedClass = isSelected ? "ring-4 ring-[#00B7AA]" : "";
                          const isDisabled = !!status || isPastSlotToday;

                          return (
                            <button
                              key={slotKey}
                              onClick={() => {
                                if (!isDisabled) {
                                  setSelectedTime(time);
                                  setSelectedRoom(room);
                                }
                              }}
                              disabled={isDisabled}
                              className={`block w-full py-2 rounded-lg mb-2 transition font-medium ${bgColor} ${selectedClass} ${
                                isDisabled ? "opacity-60 cursor-not-allowed" : ""
                              }`}
                            >
                              {buttonText}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  ))}
                </div>
              )}

              {selectedDate && selectedTime && selectedRoom && (
                <div className="mt-6 text-center">
                  <button
                    onClick={fianlbooked}
                    className="px-8 py-3 bg-gradient-to-r from-[#003BC4] to-[#00B7AA] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Registration Form — unchanged */}
          {existingPatient === "no" && (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm md:text-base">
              <div>
                <label className="block mb-1 font-medium">
                  First Name<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
                  <FaUser className="text-[#00B7AA] mr-3" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
                  <FaUser className="text-[#00B7AA] mr-3" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <AnimatedDOBPicker
                  value={formData.dob}
                  onChange={(formatted) => setFormData({ ...formData, dob: formatted })}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
                  <FaPhoneAlt className="text-[#00B7AA] mr-3" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) setFormData({ ...formData, phone: value });
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">
                  Email Address<span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center border rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm flex-1">
                    <FaEnvelope className="text-[#00B7AA] mr-2 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                      disabled={verified}
                      className={`w-full bg-transparent focus:outline-none text-gray-800 text-sm ${
                        verified ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>

                  {!verified && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={sending || timer > 0}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : sending ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                </div>
                <small className="text-green-600">
                  Once OTP is verified, you will be able to register✅
                </small>
              </div>

              {otpFieldVisible && !verified && (
                <div className="mt-3">
                  <label className="block mb-1 font-medium text-sm">
                    Enter OTP<span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center border rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm flex-1">
                      <FaKey className="text-[#00B7AA] mr-3 text-sm" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength="6"
                        required
                        className="w-full bg-transparent focus:outline-none text-gray-800 text-sm"
                        placeholder="Enter OTP"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifying}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {verifying ? "..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

              {verified && (
                <p className="mt-2 text-green-600 text-sm font-medium">
                  🎉 Email Verified Successfully!
                </p>
              )}

              {formData.firstName &&
                formData.lastName &&
                formData.dob &&
                formData.phone &&
                formData.email && (
                  <button
                    type="submit"
                    disabled={!verified}
                    className="w-full bg-gradient-to-r from-[#003BC4] to-[#00B7AA] 
                      hover:from-[#00B7AA] hover:to-[#003BC4] text-white py-3 rounded-xl 
                      font-semibold text-lg shadow-lg transition-transform duration-200 hover:scale-[1.02]
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Register
                  </button>
                )}
            </form>
          )}

          {showPopup && (
            <div className="popup-message">
              <p>{popupMessage}</p>
            </div>
          )}
        </div>

        {/* Sidebar Info — unchanged */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#00B7AA] mb-6 text-center">
            Smart Dental Clinic
          </h2>
          <div className="space-y-6">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-[#00B7AA] p-3 rounded-lg text-white flex-shrink-0">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <p className="text-gray-700">Mhada Colony, Rani Laxmibai Ward, Khat Road, Bhandara</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#00B7AA] p-3 rounded-lg text-white flex-shrink-0">
                  <FaPhone className="text-lg" />
                </div>
                <p className="text-gray-700">+91 123456789</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#003BC4]/5 to-[#00B7AA]/5 p-5 sm:p-6 rounded-lg border-2 border-[#00B7AA]/30 relative overflow-hidden">
              <h4 className="text-lg sm:text-xl font-bold text-[#003BC4] mb-3">Opening Hours</h4>
              <div className="space-y-3">
                {[
                  { day: "Monday", time: "Closed" },
                  { day: "Tuesday", time: "10:00 AM – 6:00 PM" },
                  { day: "Wednesday", time: "10:00 AM – 6:00 PM" },
                  { day: "Thursday", time: "10:00 AM – 6:00 PM" },
                  { day: "Friday", time: "10:00 AM – 6:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 12:00 PM" },
                  { day: "Sunday", time: "Closed" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-2 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                      <FaClock className="text-xl text-[#00B7AA]" />
                      <span className="font-semibold text-gray-700">{item.day}</span>
                    </div>
                    <span className="font-medium text-gray-700">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />
    </>
  );
}

export default Appointment;
