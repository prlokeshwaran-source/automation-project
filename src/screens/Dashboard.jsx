import React from 'react';
import Icon from '../components/ui/Icon';

const Dashboard = () => {
  const stats = [
    { label: 'Total Admins', value: '1,248', color: 'blue', icon: 'admin' },
    { label: 'Active Admins', value: '1,102', color: 'green', icon: 'admin' },
    { label: 'Total Organizations', value: '342', color: 'purple', icon: 'organization' },
    { label: 'Facebook Pages', value: '1,824', color: 'blue', icon: 'facebook' },
    { label: 'Active Campaigns', value: '156', color: 'orange', icon: 'campaign' },
    { label: 'Total Leads', value: '42,891', color: 'green', icon: 'user' },
    { label: 'Total Engagement', value: '1.2M', color: 'teal', icon: 'analytics' },
    { label: 'Recent Activities', value: '24', color: 'info', icon: 'clock' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Created new campaign',
      module: 'Campaigns',
      time: '2 min ago',
      status: 'success',
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Updated Facebook configuration',
      module: 'Facebook Config',
      time: '15 min ago',
      status: 'info',
    },
    {
      id: 3,
      user: 'Mike Wilson',
      action: 'Added new organization',
      module: 'Organizations',
      time: '32 min ago',
      status: 'success',
    },
    {
      id: 4,
      user: 'Emma Davis',
      action: 'Deleted admin user',
      module: 'Admin Management',
      time: '1 hour ago',
      status: 'warning',
    },
    {
      id: 5,
      user: 'Robert Brown',
      action: 'Rejected document verification',
      module: 'Documents',
      time: '2 hours ago',
      status: 'danger',
    },
  ];

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Super Admin Overview</p>
        </div>
        <div className="page-actions">
          <div className="search-box">
            <Icon name="calendar" size={16} color="var(--color-text-muted)" />
            <input type="text" placeholder="Last 30 days" style={{ width: '160px' }} />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div className="stat-icon" style={{ fontSize: '28px', marginBottom: '8px' }}>
              <Icon name={stat.icon} size={28} color="var(--color-primary)" />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Activities</div>
        </div>
        <div className="card-body">
          <ul className="activity-feed">
            {recentActivities.map((activity) => (
              <li className="activity-item" key={activity.id}>
                <div className={`activity-avatar ${activity.status === 'success' ? 'status-online' : activity.status === 'warning' ? 'status-pending' : activity.status === 'danger' ? 'status-offline' : 'status-pending'}`} style={{ background: activity.status === 'success' ? 'var(--color-success-light)' : activity.status === 'warning' ? 'var(--color-warning-light)' : activity.status === 'danger' ? 'var(--color-danger-light)' : 'var(--color-info-light)' }}>
                  <Icon name={activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : activity.status === 'danger' ? 'error' : 'info'} size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.user} — {activity.action}</div>
                  <div className="activity-desc">Module: {activity.module}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
