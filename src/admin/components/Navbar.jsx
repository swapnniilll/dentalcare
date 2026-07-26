import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// index.css and App.css are global stylesheets — import them once in
// main.jsx (app entry point), not here. Importing them per-component
// is what caused index.css's old `.sidebar` rules to clash with this
// component's Navbar.css and produce the "double sidebar" look.

const navItems = [
  { to: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { to: '/admin/registeredpatients', icon: 'bi-people-fill', label: 'Registered Patients' },
  { to: '/admin/calendar', icon: 'bi-calendar-event', label: 'Calendar' },
  { to: '/admin/appointments', icon: 'bi-calendar-check-fill', label: 'Appointments' },
  { to: '/admin/patients', icon: 'bi-person-fill', label: 'Contacts' },
  { to: '/admin/timing', icon: 'bi-clock-history', label: 'Time Slot Management' },
  { to: '/admin/past-appointments', icon: 'bi-hourglass-split', label: 'Past Appointments' },
  { to: '/admin/blog', icon: 'bi-journal-richtext', label: 'Blog' },
  { to: '/admin/gallery', icon: 'bi-images', label: 'Gallery' },
  { to: '/admin/reviews', icon: 'bi-chat-square-quote-fill', label: 'Reviews' },
  { to: '/admin/chatbot-faqs', icon: 'bi-robot', label: 'Chatbot FAQs' },
  { to: '/admin/marquee', icon: 'bi-megaphone-fill', label: 'Marquee Ticker' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);       // mobile off-canvas
  const [collapsed, setCollapsed] = useState(false);  // desktop icon-only rail

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/admin');
    }, 1200);
  };

  return (
    <>
      {/* Logout popup */}
      {showPopup && (
        <div className="logout-popup">
          <i className="bi bi-check-circle-fill me-2"></i>
          Logged out successfully!
        </div>
      )}

      {/* Mobile toggle button (off-canvas open/close) */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-glow"></div>

        <div className="sidebar-header">
          <div className="sidebar-logo-wrap">
            <i className="bi bi-gear-fill sidebar-logo-icon"></i>
          </div>
          <span className="admin-title animated-title">
            Smart Dental Clinic
          </span>

          {/* Desktop collapse toggle (3-line icon) */}
          <button
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            data-tooltip={collapsed ? 'Expand' : 'Collapse'}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        <ul className="nav flex-column mb-auto sidebar-nav">
          {navItems.map((item, index) => (
            <li
              key={item.to}
              className="nav-item sidebar-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <NavLink
                to={item.to}
                data-tooltip={item.label}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                <span className="sidebar-icon-wrap">
                  <i className={`bi ${item.icon}`}></i>
                </span>
                <span className="sidebar-label">{item.label}</span>
                <span className="sidebar-active-dot"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        <hr className="sidebar-divider" />

        <button
          onClick={handleLogout}
          className="sidebar-logout-btn"
          data-tooltip="Logout"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
