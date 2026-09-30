import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, Clock, Plus, ArrowRight, UserCheck } from 'lucide-react';
import api from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatCard from '../../components/admin/StatCard';
import Badge from '../../components/common/Badge';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    featuredEvents: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
        setRecentRegistrations(res.data.recentRegistrations || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-main)', overflowY: 'auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Welcome back to the CampusConnect administration console.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/admin/events/add" className="btn btn-primary">
              <Plus size={18} /> Add New Event
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
            color="#6366f1"
            description="All created campus events"
          />
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={Clock}
            color="#06b6d4"
            description="Scheduled for future dates"
          />
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={Users}
            color="#10b981"
            description="Active student enrollments"
          />
          <StatCard
            title="Featured Events"
            value={stats.featuredEvents}
            icon={Star}
            color="#f59e0b"
            description="Spotlighted on homepage"
          />
        </div>

        {/* Recent Registrations Table */}
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Recent Student Registrations</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Latest students who registered for campus events</p>
            </div>
            <Link to="/admin/registrations" className="btn btn-secondary btn-sm">
              View All Registrations <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading statistics...</div>
          ) : recentRegistrations.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No student registrations recorded yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Student Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.75rem 1rem' }}>College / Year</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Event Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map((reg) => (
                    <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: '#fff' }}>{reg.name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{reg.email}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{reg.college} ({reg.year})</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#a5b4fc', fontWeight: '500' }}>
                        {reg.eventId?.title || 'Unknown Event'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
