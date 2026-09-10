import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { notificationService } from '../services/api';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getNotifications();
        const notifData = (response.data?.data || []).map((n) => ({
          id: n._id,
          title: n.title,
          type: n.type,
          message: n.message,
          date: new Date(n.createdAt).toISOString().split('T')[0],
          time: new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: n.isRead,
        }));
        setNotifications(notifData);
      } catch (err) {
        setError(err.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      for (const notif of notifications.filter(n => !n.read)) {
        await notificationService.markAsRead(notif.id);
      }
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">See unread tasks, alerts, and system updates.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
            <button
              className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notif) => (
                <tr key={notif.id}>
                  <td><strong>{notif.title}</strong></td>
                  <td>{notif.type}</td>
                  <td>{notif.message}</td>
                  <td>{notif.date}</td>
                  <td>{notif.time}</td>
                  <td>
                    <span className={`badge ${notif.read ? 'badge-secondary' : 'badge-success'}`}>
                      {notif.read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {!notif.read && (
                      <button
                        className="action-btn"
                        onClick={() => markAsRead(notif.id)}
                        title="Mark as Read"
                      >
                        <Icon name="check" size={14} />
                      </button>
                    )}
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(notif.id)}
                      title="Delete"
                    >
                      <Icon name="delete" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && (
          <div className="error-banner">
            <Icon name="error" size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;