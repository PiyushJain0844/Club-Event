import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import EventForm from '../../components/admin/EventForm';
import { useToast } from '../../context/ToastContext';

const AdminAddEventPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post('/events', formData);
      showToast('Event created successfully!', 'success');
      navigate('/admin/events');
    } catch (err) {
      console.error('Failed to create event:', err);
      showToast(err.response?.data?.message || 'Failed to create event.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-main)', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '1.5rem' }}>
          Add New Event
        </h1>

        <EventForm onSubmit={handleCreateEvent} loading={loading} />
      </main>
    </div>
  );
};

export default AdminAddEventPage;
