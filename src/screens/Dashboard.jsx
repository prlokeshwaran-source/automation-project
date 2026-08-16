import React from 'react';
import Icon from '../components/ui/Icon';

const Dashboard = () => {
  const stats = [
    { label: 'Total Admins', value: '1,248', color: 'blue', icon: 'admin', trend: '+12%' },
    { label: 'Active Admins', value: '1,102', color: 'green', icon: 'admin', trend: '88%' },
    { label: 'Total Organizations', value: '342', color: 'purple', icon: 'organization', trend: '+18%' },
    { label: 'Facebook Pages', value: '1,824', color: 'blue', icon: 'facebook', trend: 'Synced' },
    { label: 'Active Campaigns', value: '156', color: 'orange', icon: 'campaign', trend: '+9%' },
    { label: 'Total Leads', value: '42,891', color: 'green', icon: 'user', trend: '+2.3K' },
    { label: 'Total Engagement', value: '1.2M', color: 'teal', icon: 'analytics', trend: '+24%' },
    { label: 'Recent Activities', value: '24', color: 'info', icon: 'clock', trend: 'Live' },
  ];

  const heroSignals = [
    { label: 'Connected pages', value: '1,824', note: 'All tokens healthy' },
    { label: 'Active campaigns', value: '156', note: '12 awaiting review' },
    { label: 'Unread alerts', value: '9', note: '3 need attention' },
  ];

  const operationalSignals = [
    { label: 'Campaign health', value: 84, note: 'Stable delivery', color: 'blue' },
    { label: 'Lead capture', value: 72, note: 'Strong conversion trend', color: 'green' },
    { label: 'Verification queue', value: 53, note: '4 items need review', color: 'orange' },
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

  const chartData = [
    { day: 'Mon', value: 3400 },
    { day: 'Tue', value: 4200 },
    { day: 'Wed', value: 3800 },
    { day: 'Thu', value: 5100 },
    { day: 'Fri', value: 4900 },
    { day: 'Sat', value: 6200 },
    { day: 'Sun', value: 5800 },
  ];

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <span className="page-kicker">Super Admin Workspace</span>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            A polished overview of your people, pages, campaigns, and operational health.
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" type="button">
            <Icon name="calendar" size={16} />
            Last 30 days
          </button>
          <button className="btn btn-primary" type="button">
            <Icon name="plus" size={16} />
            Create Campaign
          </button>
        </div>
      </div>

      <div className="dashboard-hero card">
        <div className="dashboard-hero-copy">
          <span className="hero-badge">Live platform pulse</span>
          <h2>Everything you need to run the platform, without leaving the page.</h2>
          <p>
            Track high-value metrics, spot risky activity, and move from insight to action in one click.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button">
              <Icon name="bell" size={16} />
              Review alerts
            </button>
            <button className="btn btn-outline" type="button">
              <Icon name="export" size={16} />
              Export summary
            </button>
          </div>
          <div className="hero-mini-metrics">
            {heroSignals.map((metric) => (
              <div className="hero-mini-card" key={metric.label}>
                <span className="hero-mini-label">{metric.label}</span>
                <strong>{metric.value}</strong>
                <span>{metric.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-hero-panel">
          <div className="dashboard-hero-panel-head">
            <span>System snapshot</span>
            <Icon name="activity" size={16} />
          </div>
          <div className="dashboard-hero-list">
            <div className="dashboard-hero-item">
              <span className="status-dot status-online" />
              <div>
                <strong>Facebook sync is healthy</strong>
                <span>All connected pages are responding normally.</span>
              </div>
            </div>
            <div className="dashboard-hero-item">
              <span className="status-dot status-pending" />
              <div>
                <strong>Verification queue needs review</strong>
                <span>4 documents are waiting for approval.</span>
              </div>
            </div>
            <div className="dashboard-hero-item">
              <span className="status-dot status-offline" />
              <div>
                <strong>One automation is paused</strong>
                <span>Check policy or resume when ready.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <Icon name={stat.icon} size={22} color="currentColor" />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-trend">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Activities</div>
              <p className="card-subtitle">The latest actions across the platform.</p>
            </div>
            <button className="btn btn-soft btn-sm" type="button">
              View all
            </button>
          </div>

          <div className="card-body">
            <ul className="activity-feed">
              {recentActivities.map((activity) => (
                <li className="activity-item" key={activity.id}>
                  <div
                    className={`activity-avatar ${
                      activity.status === 'success'
                        ? 'status-online'
                        : activity.status === 'warning'
                          ? 'status-pending'
                          : activity.status === 'danger'
                            ? 'status-offline'
                            : 'status-pending'
                    }`}
                  >
                    <Icon
                      name={
                        activity.status === 'success'
                          ? 'success'
                          : activity.status === 'warning'
                            ? 'warning'
                            : activity.status === 'danger'
                              ? 'error'
                              : 'info'
                      }
                      size={16}
                    />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {activity.user} - {activity.action}
                    </div>
                    <div className="activity-desc">Module: {activity.module}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Operational Snapshot</div>
              <p className="card-subtitle">Quick signals to help you prioritize work.</p>
            </div>
            <span className="badge badge-info">Live</span>
          </div>

          <div className="card-body">
            <div className="signal-stack">
              {operationalSignals.map((signal) => (
                <div className="signal-row" key={signal.label}>
                  <div className="signal-copy">
                    <strong>{signal.label}</strong>
                    <span>{signal.note}</span>
                  </div>
                  <div className="signal-meter">
                    <span>{signal.value}%</span>
                    <div className="signal-track">
                      <div
                        className={`signal-fill signal-${signal.color}`}
                        style={{ width: `${signal.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-container compact">
              {chartData.map((item) => (
                <div
                  key={item.day}
                  className="chart-column"
                  style={{ height: `${(item.value / 7000) * 100}%` }}
                >
                  <span className="bar-value">{item.value.toLocaleString()}</span>
                  <span className="chart-label">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
