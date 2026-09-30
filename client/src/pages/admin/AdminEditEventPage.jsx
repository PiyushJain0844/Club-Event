import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import EventForm from '../../components/admin/EventForm';
import { useToast } from '../../context/ToastContext';

const AdminEditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/events/${id}`);
      setEventData(res.data.event);
    } catch (err) {
      console.error('Error loading event for edit:', err);
      showToast('Event not found or failed to load.', 'error');
      navigate('/admin/events');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (formData) => {
    try {
      setUpdating(true);
      await api.put(`/events/${id}`, formData);
      showToast('Event updated successfully!', 'success');
      navigate('/admin/events');
    } catch (err) {
      console.error('Failed to update event:', err);
      showToast(err.response?.data?.message || 'Failed to update event.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-main)', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '1.5rem' }}>
          Edit Event
        </h1>

        {loading ? (
          <div style={{ color: 'var(--text-muted)' }}>Loading event details...</div>
        ) : (
          <EventForm initialData={eventData} onSubmit={handleUpdateEvent} isEditing={true} loading={updating} />
        )}
      </main>
    </div>
  );
};

export default AdminEditEventPage;
