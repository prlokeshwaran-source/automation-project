import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New campaign created',
      type: 'Campaign',
      message: 'Admin John Smith created a new campaign: "Summer Sale 2025"',
      date: '2025-06-10',
      time: '09:30',
      read: false,
    },
    {
      id: 2,
      title: 'Document requires review',
      type: 'Document',
      message: 'New document "Tax Registration" uploaded by Beta Ltd needs verification',
      date: '2025-06-10',
      time: '08:45',
      read: false,
    },
    {
      id: 3,
      title: 'Facebook page disconnected',
      type: 'Facebook',
      message: 'Page "Gamma Inc Marketing" has been disconnected',
      date: '2025-06-09',
      time: '14:22',
      read: true,
    },
    {
      id: 4,
      title: 'Failed login attempt',
      type: 'Security',
      message: 'Unrecognized login attempt from IP 203.0.113.45',
      date: '2025-06-08',
      time: '23:17',
      read: true,
    },
    {
      id: 5,
      title: 'Automation disabled',
      type: 'Automation',
      message: 'Automation "Post Engagement Booster" was disabled due to policy violation',
      date: '2025-06-08',
      time: '11:30',
      read: true,
    },
    {
      id: 6,
      title: 'New organization registered',
      type: 'Organization',
      message: 'Epsilon LLC has been registered and is pending verification',
      date: '2025-06-07',
      time: '10:00',
      read: true,
    },
  ]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = (type) => {
    const colors = {
      Campaign: 'blue',
      Document: 'warning',
      Facebook: 'info',
      Security: 'danger',
      Automation: 'purple',
      Organization: 'green',
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline btn-sm" onClick={markAllAsRead} style={{ marginRight: '8px' }}>
            <Icon name="check" size={14} style={{ marginRight: '4px' }} />
            Mark All as Read
          </button>
          <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '140px' }}>
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table className="admin-table" style={{ marginBottom: '0' }}>
            <thead>
              <tr>
                <th style={{ width: '36px' }}></th>
                <th>Notification Title</th>
                <th>Notification Type</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notif) => (
                <tr key={notif.id} style={{ opacity: notif.read ? 0.7 : 1, backgroundColor: notif.read ? 'transparent' : 'var(--color-primary-light)' }}>
                  <td style={{ textAlign: 'center' }}>
                    <span className="status-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: notif.read ? 'var(--color-text-muted)' : 'var(--color-primary)' }}></span>
                  </td>
                  <td><strong>{notif.title}</strong></td>
                  <td>
                    <span className={`badge badge-${getTypeColor(notif.type)}`}>{notif.type}</span>
                  </td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {notif.message}
                  </td>
                  <td>{notif.date}</td>
                  <td>{notif.time}</td>
                  <td>
                    <span className={`badge ${notif.read ? 'badge-secondary' : 'badge-info'}`}>
                      {notif.read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {!notif.read && (
                      <button className="action-btn" title="Mark as Read" onClick={() => markAsRead(notif.id)}>
                        <Icon name="check" size={13} />
                      </button>
                    )}
                    <button className="action-btn" title="Delete" onClick={() => deleteNotification(notif.id)}>
                      <Icon name="delete" size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNotifications.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><Icon name="notifications" size={48} /></div>
            <p className="empty-text">No notifications found</p>
            <p className="empty-subtext">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
