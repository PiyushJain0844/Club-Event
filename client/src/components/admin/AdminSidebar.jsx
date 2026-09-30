import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, PlusCircle, Users, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AdminSidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out of admin portal successfully.', 'info');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Events List', path: '/admin/events', icon: Calendar },
    { label: 'Add New Event', path: '/admin/events/add', icon: PlusCircle },
    { label: 'Registrations', path: '/admin/registrations', icon: Users }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Header Toggle for Admin */}
      <div
        className="admin-mobile-header"
        style={{
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="var(--primary)" />
          <span style={{ fontWeight: '700', color: '#fff' }}>Admin Panel</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 1rem',
          minHeight: '100vh'
        }}
      >
        {/* Brand */}
        <div style={{ padding: '0 0.5rem 1.5rem 0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: 1 }}>CampusConnect</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>Admin Dashboard</span>
            </div>
          </Link>
        </div>

        {/* User Info Badge */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged in as</div>
          <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#fff', wordBreak: 'break-all' }}>
            {user?.email || 'admin@campusconnect.com'}
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  color: active ? '#ffffff' : 'var(--text-muted)',
                  backgroundColor: active ? 'var(--primary)' : 'transparent',
                  transition: 'var(--transition)'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick View Public Site */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem'
            }}
          >
            <Calendar size={16} /> View Student Website
          </Link>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .admin-mobile-header { display: flex !important; }
          .admin-sidebar {
            display: none !important;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100% !important;
            z-index: 1000;
          }
          .admin-sidebar.open {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
