import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Appointments from '../pages/Appointments';
import AdminTimeBlockPanel from '../pages/AdminTimeBlockPanel';
import RegisteredPatients from '../pages/Registeredpatients';
import Past_Appointments from '../pages/Past_Appointments';
import Calendar from '../pages/Calendar';
import Blog from '../pages/Blog';
import Gallery from '../pages/Gallery';
import Reviews from '../pages/Reviews';
import ChatbotFaqs from '../pages/ChatbotFaqs';
import MarqueeMessages from '../pages/MarqueeMessages';
import "../App.css";
const AppRoutes = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/admin" />} />
      <Route path="/patients" element={isLoggedIn ? <Patients /> : <Navigate to="/admin" />} />
      <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/admin" />} />
      <Route path="/appointments" element={isLoggedIn ? <Appointments /> : <Navigate to="/admin" />} />
      <Route path="/timing" element={isLoggedIn ? <AdminTimeBlockPanel /> : <Navigate to="/admin" />} />
      <Route path="/registeredpatients" element={isLoggedIn ? <RegisteredPatients /> : <Navigate to="/admin" />} />
      <Route path="/past-appointments" element={isLoggedIn ? <Past_Appointments /> : <Navigate to="/admin" />} />
      <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/admin" />} />
      <Route path="/gallery" element={isLoggedIn ? <Gallery /> : <Navigate to="/admin" />} />
      <Route path="/reviews" element={isLoggedIn ? <Reviews /> : <Navigate to="/admin" />} />
      <Route path="/chatbot-faqs" element={isLoggedIn ? <ChatbotFaqs /> : <Navigate to="/admin" />} />
      <Route path="/marquee" element={isLoggedIn ? <MarqueeMessages /> : <Navigate to="/admin" />} />
    </Routes>
  );
};

export default AppRoutes;