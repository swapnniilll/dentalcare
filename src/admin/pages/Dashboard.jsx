import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';
// NOTE: Sidebar/Navbar is no longer imported or rendered here.
// AdminApp.jsx already renders <Navbar /> once for the entire admin
// section — rendering it again here was creating two independent
// sidebar instances stacked on top of each other (the "double
// sidebar" bug), each with its own collapsed/open state.
import './Dashboard.css';

const API_BASE_URL = 'http://localhost:8081';

const STATUS_COLORS = {
  Booked: '#3b82f6',
  Completed: '#22c55e',
  Cancelled: '#ef4444',
  Pending: '#f59e0b',
};

const ROOM_COLORS = ['#06b6d4', '#8b5cf6', '#f97316'];

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [counts, setCounts] = useState({
    appointments: 0,
    contacts: 0,
    patients: 0,
    slots: 0,
    pastAppointments: 0,
  });
  const [chartData, setChartData] = useState({
    statusBreakdown: {},
    roomUsage: {},
    weeklyTrend: [],
    peakHours: {},
    newPatientsThisMonth: 0,
  });
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/dashboard/counts`)
      .then((res) => res.json())
      .then(setCounts)
      .catch((err) => console.error('Dashboard counts error:', err));

    fetch(`${API_BASE_URL}/api/dashboard/charts`)
      .then((res) => res.json())
      .then((data) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Dashboard chart error:', err);
        setLoading(false);
      });

    fetch(`${API_BASE_URL}/api/dashboard/today`)
      .then((res) => res.json())
      .then(setTodaysAppointments)
      .catch((err) => console.error('Todays appointments error:', err));
  }, []);

  const formatTime = (date) => date.toLocaleTimeString();

  const greeting =
    time.getHours() < 12 ? 'Good Morning' : time.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  const statusPieData = Object.entries(chartData.statusBreakdown || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const roomBarData = Object.entries(chartData.roomUsage || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const trendData = (chartData.weeklyTrend || []).map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
  }));

  const peakHoursData = Object.entries(chartData.peakHours || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const quickLinks = [
    { label: 'Appointments', value: counts.appointments, icon: 'bi-calendar-check-fill', color: '#3b82f6', path: '/admin/appointments' },
    { label: 'Contacts', value: counts.contacts, icon: 'bi-person-lines-fill', color: '#06b6d4', path: '/admin/patients' },
    { label: 'Registered Patients', value: counts.patients, icon: 'bi-people-fill', color: '#f59e0b', path: '/admin/registeredpatients' },
    { label: 'Time Slots', value: counts.slots, icon: 'bi-clock-fill', color: '#8b5cf6', path: '/admin/timing' },
    { label: 'Calendar', value: counts.appointments, icon: 'bi-calendar3', color: '#ef4444', path: '/admin/calendar' },
    { label: 'Past Appointments', value: counts.pastAppointments, icon: 'bi-hourglass-split', color: '#64748b', path: '/admin/past-appointments' },
    { label: 'New Patients (Month)', value: chartData.newPatientsThisMonth, icon: 'bi-person-plus-fill', color: '#22c55e', path: '/admin/registeredpatients' },
  ];

  const downloadDashboardPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Smart Dental Clinic — Dashboard Report', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 27);

    // Summary table
    autoTable(doc, {
      startY: 35,
      head: [['Metric', 'Value']],
      body: [
        ['Total Appointments', counts.appointments],
        ['Contacts', counts.contacts],
        ['Registered Patients', counts.patients],
        ['Blocked/Booked Slots', counts.slots],
        ['Past Appointments', counts.pastAppointments],
        ['New Patients This Month', chartData.newPatientsThisMonth],
      ],
      theme: 'striped',
      headStyles: { fillColor: [6, 182, 212] },
    });

    // Status breakdown table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Status', 'Count']],
      body: statusPieData.map((s) => [s.name, s.value]),
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
    });

    // Today's appointments table
    if (todaysAppointments.length > 0) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['First Name', 'Last Name', 'Time', 'Room', 'Status']],
        body: todaysAppointments.map((a) => [a.firstName, a.lastName, a.time, a.room, a.status]),
        theme: 'striped',
        headStyles: { fillColor: [34, 197, 94] },
      });
    }

    doc.save('Dashboard_Report.pdf');
  };

  return (
    <div className="d-flex dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2>
              <i className="bi bi-speedometer2 me-2"></i>
              Admin Dashboard
            </h2>
            <p>{greeting}, welcome to the Smart Dental Clinic admin panel</p>
          </div>
          <div className="dashboard-header-actions">
            <div className="dashboard-clock">{formatTime(time)}</div>
            <button className="dashboard-export-btn" onClick={downloadDashboardPDF}>
              <i className="bi bi-file-earmark-arrow-down-fill me-2"></i>
              Export Report
            </button>
          </div>
        </div>

        {/* Quick Stat Tiles */}
        <div className="dashboard-tiles">
          {quickLinks.map((item) => (
            <Link to={item.path} key={item.label} className="dashboard-tile">
              <div className="dashboard-tile-icon" style={{ background: `${item.color}22`, color: item.color }}>
                <i className={`bi ${item.icon}`}></i>
              </div>
              <div>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Charts */}
        {loading ? (
          <div className="dashboard-loading">Loading analytics...</div>
        ) : (
          <div className="dashboard-charts-grid">
            {/* Weekly Trend */}
            <div className="dashboard-chart-card wide">
              <h4>Appointments — Last 7 Days</h4>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#06b6d4' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Status Breakdown (percentages) */}
            <div className="dashboard-chart-card">
              <h4>Appointment Status</h4>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusPieData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => {
                      const total = statusPieData.reduce((sum, d) => sum + d.value, 0);
                      const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                      return [`${value} (${percent}%)`, name];
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Room Usage */}
            <div className="dashboard-chart-card">
              <h4>Room Usage</h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={roomBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {roomBarData.map((entry, index) => (
                      <Cell key={entry.name} fill={ROOM_COLORS[index % ROOM_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Peak Booking Hours */}
            <div className="dashboard-chart-card wide">
              <h4>Peak Booking Hours</h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Today's Appointments */}
        <div className="dashboard-today-card">
          <h4>
            <i className="bi bi-calendar-day-fill me-2"></i>
            Today's Appointments ({todaysAppointments.length})
          </h4>

          {todaysAppointments.length === 0 ? (
            <p className="dashboard-today-empty">No appointments scheduled for today.</p>
          ) : (
            <div className="dashboard-today-table-wrapper">
              <table className="dashboard-today-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysAppointments.map((a) => (
                    <tr key={a.id}>
                      <td>{a.firstName} {a.lastName}</td>
                      <td>{a.time}</td>
                      <td>{a.room}</td>
                      <td>
                        <span className={`dashboard-status-pill status-${(a.status || '').toLowerCase()}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="admin-footer">
          <div>&copy; {new Date().getFullYear()} Developed by CDAC. All Rights Reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
