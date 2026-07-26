import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

// Helper to sync selectedDate string from day + month
function updateSelectedDateFromDropdown(day, month) {
  const tempDate = new Date(currentYear, month, day);
  const dayName = tempDate.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = tempDate.toLocaleDateString('en-US', { month: 'short' });
  const formattedDate = `${dayName} ${monthName} ${day}`;
  setSelectedDate(formattedDate);
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

  const [timer, setTimer] = useState(0);       // countdown in seconds
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

  const showMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500); // auto close in 2.5s
  };

  const updateSelectedDateFromDropdown = (day, month) => {
    const dateObj = new Date(currentYear, month, day);
  
    // Skip if Sunday or Monday
    if (dateObj.getDay() === 0 || dateObj.getDay() === 1) {
      setSelectedDate(""); // Deselect
      return;
    }
  
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
    // const formattedDate = `${dayName} ${monthName} ${day}`;
    const formattedDate = date.toISOString().split("T")[0]; 
    setSelectedDate(formattedDate);
     // ✅ YYYY-MM-DD

    const date = new Date(currentYear, month, day);
    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);  
  };
  
const today = new Date();
const todayISO = today.toISOString().split("T")[0]; // e.g. 2025-08-19

const [selectedDate, setSelectedDate] = useState(todayISO);
const [selectedDay, setSelectedDay] = useState(today.getDate());
const [selectedMonth, setSelectedMonth] = useState(today.getMonth());


  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
 


  // ✅ Get number of days in a given month/year
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};


  const currentYear = new Date().getFullYear();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8081/api/patient/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });
  
      const result = await res.json();
  
      if (result.success) {
        setAlertMessage("✅ Patient Verified!");
        setTimeout(() => {
          setShowCalendar(true);
        }, 1000);
      } else {
        setAlertMessage("⚠️ Patient not found. Please register below.");
        setTimeout(() => setExistingPatient("no"), 1500);
      }
    } catch (error) {
      console.error("Error verifying patient:", error);
      setAlertMessage("❌ Error verifying patient. Try again later.");
    }
  
    // 🔴 ❌ REMOVE THIS LINE from here:
    // setPatientData({ firstName: "", lastName: "", dob: "" });
  };
  
  const sendOtp = async () => {
    if (!formData.email) return showMessage("Enter email");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return showMessage("Enter valid email");
  
    setSending(true);
  
    try {
      const res = await fetch("http://localhost:8081/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const data = await res.json();
  
      if (data.status === "success") {
        setOtpFieldVisible(true);
        showMessage("✅ OTP sent successfully!");
  
        // ✅ Start 2-minute countdown (120 seconds)
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
  
  

  // Verify OTP
  const verifyOtp = async () => {
    if (!formData.email || !otp) return showMessage("Enter email and OTP");
  
    setVerifying(true);
    try {
      const res = await fetch("http://localhost:8081/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (data.status === "success") {   // ✅ fixed
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
    const response = await fetch('http://localhost:8081/api/patient/register', {
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

      // ✅ After registration, move to "Yes" mode with Calendar
      setExistingPatient("yes");
      setPatientData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email
      });
      setShowCalendar(true);

      // reset only form fields (not patient data)
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
        `http://localhost:8081/api/slots/blocked?date=${formattedDate}`
      );
      const data = await response.json();

      const blockedMap = {};
      data.forEach(({ room, time, status }) => {
        blockedMap[`${room}_${time}`] = status; // 👈 Save status instead of true
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
    // ✅ First: Save appointment in DB
    const response = await fetch("http://localhost:8081/api/appointment/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });

    const result = await response.json();
    console.log("DB Result:", result);

    if (result.success) {
      setAlertMessage("🎉 Appointment booked successfully! A confirmation email has been sent to your registered email address.");
      // ✅ Reset form fields
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

const isRequiredFilled =
patientData.firstName.trim() !== "" &&
patientData.lastName.trim() !== "" &&
patientData.dob.trim() !== "";

const isRegisterRequiredFilled =
  formData.firstName.trim() !== "" &&
  formData.lastName.trim() !== "" &&
  formData.dob.trim() !== "" &&
  formData.email.trim() !== "" &&
  formData.phone.trim() !== "";


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
                onChange={() => setExistingPatient("yes")}
                checked={existingPatient === "yes"}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="existing"
                value="no"
                onChange={() => setExistingPatient("no")}
                checked={existingPatient === "no"}
              />
              No
            </label>
          </div>

          {/* ✅ Existing Patient Form */}
          {existingPatient === "yes" && !showCalendar && (
            <form onSubmit={handlePatientSubmit} className="space-y-6 text-sm md:text-base">
             <div>
  <label className="block mb-1 font-medium">
    First Name<span className="text-red-500">*</span>
  </label>
  <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
    <FaUser className="text-[#00B7AA] mr-3" />
    <input
      type="text"
      name="firstName"
      value={patientData.firstName}
      onChange={handlePatientChange}
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
      value={patientData.lastName}
      onChange={handlePatientChange}
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

  <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm relative">
    <FaCalendarAlt
      className="text-[#00B7AA] mr-3 cursor-pointer"
      onClick={() => hiddenDateRef.current.showPicker()} // Open calendar on icon click
    />

    {/* Visible input with MM/DD/YYYY format */}
    <input
      type="text"
      name="dob"
      value={patientData.dob}
      onChange={(e) => {
        const value = e.target.value;
        const cleaned = value.replace(/\D/g, "");
        let formatted = cleaned;
        if (cleaned.length >= 3 && cleaned.length <= 4) {
          formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        } else if (cleaned.length > 4) {
          formatted =
            cleaned.slice(0, 2) +
            "/" +
            cleaned.slice(2, 4) +
            "/" +
            cleaned.slice(4, 8);
        }
        handlePatientChange({
          target: { name: "dob", value: formatted },
        });
      }}
      placeholder="MM/DD/YYYY"
      maxLength={10}
      required
      className="w-full bg-transparent focus:outline-none text-gray-800"
      onBlur={() => {
        const regex =
          /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (patientData.dob && !regex.test(patientData.dob)) {
          alert("Please enter a valid date in MM/DD/YYYY format");
        }
      }}
      onClick={() => hiddenDateRef.current.showPicker()} // Open hidden calendar
    />

    {/* Hidden native date picker */}
    <input
      type="date"
      ref={hiddenDateRef}
      onChange={(e) => {
        const date = e.target.value; // format: YYYY-MM-DD
        if (date) {
          const [year, month, day] = date.split("-");
          const formatted = `${month}/${day}/${year}`;
          handlePatientChange({
            target: { name: "dob", value: formatted },
          });
        }
      }}
      className="absolute inset-0 opacity-0 cursor-pointer"
      style={{ pointerEvents: "none" }} // Prevent direct clicking
    />
  </div>
</div>

<div>
  <label className="block mb-1 font-medium">
    Phone Number
  </label>
  <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
    <FaPhoneAlt className="text-[#00B7AA] mr-3" />
    <input
      type="tel"
      name="phone"
      value={patientData.phone}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          handlePatientChange({
            target: { name: "phone", value },
          });
        }
      }}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={10}
      className="w-full bg-transparent focus:outline-none text-gray-800"
      placeholder="Enter your phone (optional)"
    />
  </div>
</div>

<div>
  <label className="block mb-1 font-medium">
    Email Address
  </label>
  <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm">
    <FaEnvelope className="text-[#00B7AA] mr-3" />
    <input
      type="email"
      name="email"
      value={patientData.email}
      onChange={handlePatientChange}
      className="w-full bg-transparent focus:outline-none text-gray-800"
      placeholder="Enter your email (optional)"
    />
  </div>
</div>

      {isRequiredFilled && (
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#003BC4] to-[#00B7AA] hover:from-[#00B7AA] hover:to-[#003BC4] text-white py-3 rounded-xl font-semibold text-lg shadow-lg transition-transform duration-200 hover:scale-[1.02]"
        >
          Submit
        </button>
      )}
            </form>
          )}

          {/* ✅ Calendar Section */}
          {showCalendar && (
  <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto mt-6">
    <h2 className="text-2xl font-bold text-center mb-4">Book a Date and Time:</h2>

    {/* ✅ Manual Date Selection */}
   

    {/* ✅ Date Tabs (7 days auto-generated, skip Sun & Mon) */}
    <div className="flex gap-3 mb-6 overflow-x-auto px-2">
  {(() => {
    const dates = [];
    let i = 0;

    while (dates.length < 25) {   // ✅ SHOW 25 DAYS
      const date = new Date();
      date.setDate(date.getDate() + i);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = date.getDate();

      // Skip Sunday (0) & Monday (1)
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

    {/* Label */}
    <label
      htmlFor="date-picker"
      className="text-lg font-semibold text-gray-700 min-w-[120px]"
    >
      Select Date:
    </label>

    {/* Calendar Wrapper */}
    <div className="relative w-[260px]">

      {/* Calendar Icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        📅
      </span>

      {/* Calendar Input */}
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

          // Remove timezone issue
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

        // Disable Sunday & Monday
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





    {/* ✅ Time Slots */}
<div className="grid grid-cols-3 gap-4 mt-5">
  {["Room 1", "Room 2", "Emergency"].map((room) => (
    <div key={room}>
      <h3 className="text-lg font-semibold mb-2 text-center">{room}</h3>

      {(() => {
        // get the selected date's day name
        const dateObj = selectedDate ? new Date(selectedDate) : null;
        const day = dateObj ? dateObj.getDay() : null;

        // ✅ If Saturday (6), show only 9 AM to 12 PM
        // ✅ Else (Tue–Fri), show default 10 AM to 5 PM (8 slots)
        let startHour, endHour;
        if (day === 6) {
          startHour = 9;
          endHour = 12;
        } else {
          startHour = 10;
          endHour = 17;
        }

        const totalSlots = endHour - startHour + 1;

        return Array.from({ length: totalSlots }).map((_, i) => {
          const hour = startHour + i;
          const displayHour = hour > 12 ? hour - 12 : hour;
          const period = hour >= 12 ? "PM" : "AM";
          const time = `${displayHour}:00 ${period}`;
          const slotKey = `${room}_${time}`;

          const status = blockedSlots?.[slotKey];
          let bgColor = "bg-green-600 hover:bg-green-700 text-white";
          let buttonText = time;

          if (room === "Emergency") {
            bgColor = "bg-green-600 hover:bg-green-700 text-white";
          }

          if (status === "blocked") {
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

          return (
            <button
              key={slotKey}
              onClick={() => {
                if (!status) {
                  setSelectedTime(time);
                  setSelectedRoom(room);
                }
              }}
              disabled={!!status}
              className={`block w-full py-2 rounded-lg mb-2 transition font-medium ${bgColor} ${selectedClass} ${
                status ? "opacity-60 cursor-not-allowed" : ""
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

          {/* ✅ Registration Form */}
          {existingPatient === "no" && (
           <form onSubmit={handleSubmit} className="space-y-6 text-sm md:text-base">
           {/* First Name */}
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
         
           {/* Last Name */}
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
         
           {/* Date of Birth */}
           <div>
             <label className="block mb-1 font-medium">
               Date of Birth<span className="text-red-500">*</span>
             </label>
             <div className="flex items-center border rounded-xl px-4 py-2 bg-white/80 backdrop-blur-sm relative">
               <FaCalendarAlt
                 className="text-[#00B7AA] mr-3 cursor-pointer"
                 onClick={() => hiddenDateRef.current.showPicker()}
               />
               <input
                 type="text"
                 name="dob"
                 value={formData.dob || ""}
                 onChange={(e) => {
                   const value = e.target.value;
                   const cleaned = value.replace(/\D/g, "");
                   let formatted = cleaned;
                   if (cleaned.length >= 3 && cleaned.length <= 4) {
                     formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
                   } else if (cleaned.length > 4) {
                     formatted =
                       cleaned.slice(0, 2) +
                       "/" +
                       cleaned.slice(2, 4) +
                       "/" +
                       cleaned.slice(4, 8);
                   }
                   setFormData({ ...formData, dob: formatted });
                 }}
                 placeholder="MM/DD/YYYY"
                 maxLength={10}
                 required
                 className="w-full bg-transparent focus:outline-none text-gray-800"
                 onBlur={() => {
                   const regex =
                     /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
                   if (formData.dob && !regex.test(formData.dob)) {
                     alert("Please enter a valid date in MM/DD/YYYY format");
                   }
                 }}
                 onClick={() => hiddenDateRef.current.showPicker()}
               />
               <input
                 type="date"
                 ref={hiddenDateRef}
                 onChange={(e) => {
                   const date = e.target.value;
                   if (date) {
                     const [year, month, day] = date.split("-");
                     const formatted = `${month}/${day}/${year}`;
                     setFormData({ ...formData, dob: formatted });
                   }
                 }}
                 className="absolute inset-0 opacity-0 cursor-pointer"
                 style={{ pointerEvents: "none" }}
               />
             </div>
           </div>
         
           {/* Phone */}
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
         
           {/* Email */}
          {/* Email Address + Send OTP */}
          <div>
  <label className="block mb-1 font-medium text-sm">
    Email Address<span className="text-red-500">*</span>
  </label>

  <div className="flex items-center gap-2 w-full">
    {/* Email Input */}
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

    {/* Send OTP Button */}
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
  <small  className="text-green-600">
      Once OTP is verified, you will be able to register✅
</small>
</div>


{/* OTP Input Field */}
{otpFieldVisible && !verified && (
  <div className="mt-3">
    <label className="block mb-1 font-medium text-sm">
      Enter OTP<span className="text-red-500">*</span>
    </label>

    <div className="flex items-center gap-2 w-full">
      {/* OTP Input */}
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

      {/* Verify Button */}
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



{/* Success Message */}
{verified && (
  <p className="mt-2 text-green-600 text-sm font-medium">
    🎉 Email Verified Successfully!
  </p>
)}

           {/* Register Button (only when all fields filled) */}
           {formData.firstName &&
 formData.lastName &&
 formData.dob &&
 formData.phone &&
 formData.email && (
   <button
     type="submit"
     disabled={!verified}  // 🚀 stays disabled until OTP is verified
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

        {/* Sidebar Info */}
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
                  { day: "Tuesday", time: "Emergency Appointments" },
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