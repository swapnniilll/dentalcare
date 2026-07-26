import React, { useState } from 'react';
import './Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === 'SmartDental' && password === '1234') {
        setType('success');
        setPopup('Login Successful! Redirecting...');
        localStorage.setItem('isLoggedIn', 'true');
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1200);
      } else {
        setLoading(false);
        setType('error');
        setPopup('Invalid Credentials! Please try again.');
        setTimeout(() => setPopup(''), 2200);
      }
    }, 900);
  };

  return (
    <div className="aurora-login-container">
      {/* Animated background layers */}
      <div className="aurora-bg-layer layer-1"></div>
      <div className="aurora-bg-layer layer-2"></div>
      <div className="aurora-bg-layer layer-3"></div>

      {/* Floating tooth particles */}
      <div className="floating-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <i key={i} className={`bi bi-emoji-smile particle particle-${i + 1}`}></i>
        ))}
      </div>

      {popup && (
        <div className={`aurora-popup ${type}`}>
          <i className={`bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2`}></i>
          {popup}
        </div>
      )}

      <div className="aurora-wrapper">
        {/* Info / Branding Panel */}
        <div className="aurora-info-panel">
          <div className="aurora-logo-badge">
            <i className="bi bi-hospital-fill"></i>
          </div>
          <h1>Smart Dental Clinic</h1>
          <p className="aurora-subtitle">Admin Control Panel</p>

          <ul className="aurora-feature-list">
            <li>
              <i className="bi bi-shield-lock-fill"></i>
              Secure access for authorized staff only
            </li>
            <li>
              <i className="bi bi-calendar-check-fill"></i>
              Manage appointments, patients & content
            </li>
            <li>
              <i className="bi bi-graph-up-arrow"></i>
              Real-time dashboard analytics
            </li>
          </ul>

          <div className="aurora-badge-row">
            <span className="aurora-mini-badge">
              <i className="bi bi-lock-fill me-1"></i> Encrypted
            </span>
            <span className="aurora-mini-badge">
              <i className="bi bi-clock-history me-1"></i> 24/7 Access
            </span>
          </div>
        </div>

        {/* Login Form Panel */}
        <form className="aurora-login-box" onSubmit={handleSubmit}>
          <div className="aurora-icon-orbit">
            <div className="aurora-icon-core">
              <i className="bi bi-person-badge-fill"></i>
            </div>
          </div>

          <h2 className="aurora-title">Welcome Back</h2>
          <p className="aurora-tagline">Sign in to manage your clinic</p>

          <div className="aurora-input-box">
            <i className="bi bi-person-fill aurora-input-icon"></i>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
            />
            <label>Username</label>
          </div>

          <div className="aurora-input-box">
            <i className="bi bi-lock-fill aurora-input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>Password</label>
            <button
              type="button"
              className="aurora-toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
            </button>
          </div>

          <button className="aurora-btn" type="submit" disabled={loading}>
            {loading ? (
              <span className="aurora-spinner"></span>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </>
            )}
          </button>

          <div className="aurora-footer-note">
            <i className="bi bi-info-circle me-1"></i>
            Contact your system administrator if you've lost access.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;