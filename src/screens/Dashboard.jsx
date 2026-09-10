import React, { useEffect, useState } from 'react';
import Icon from '../components/ui/Icon';
import { analyticsService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recentActivities: [],
    operationalSignals: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.organization?._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await analyticsService.getDashboardStats(user.organization._id);
        const data = response.data;

        setDashboardData({
          stats: {
            totalUsers: data.stats?.totalUsers || 0,
            activeUsers: data.stats?.activeUsers || 0,
            totalOrgs: data.stats?.totalOrgs || 0,
            facebookPages: data.stats?.facebookPages || 0,
            activeCampaigns: data.stats?.activeCampaigns || 0,
            totalLeads: data.stats?.totalLeads || 0,
            totalEngagement: data.stats?.totalEngagement || 0,
          },
          recentActivities: data.recentActivities || [],
          operationalSignals: {
            campaignHealth: 0,
            leadCapture: 0,
            verificationQueue: 0,
          },
        });

        // Fetch operational signals
        const signalsRes = await analyticsService.getOperationalSignals(user.organization._id);
        setDashboardData((prev) => ({
          ...prev,
          operationalSignals: signalsRes.data?.signals || {},
        }));
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.organization?._id]);

  const stats = [
    { label: 'Total Admins', value: dashboardData.stats.totalUsers.toString(), color: 'blue', icon: 'admin', trend: '+12%' },
    { label: 'Active Admins', value: dashboardData.stats.activeUsers.toString(), color: 'green', icon: 'admin', trend: '88%' },
    { label: 'Total Organizations', value: dashboardData.stats.totalOrgs.toString(), color: 'purple', icon: 'organization', trend: '+18%' },
    { label: 'Facebook Pages', value: dashboardData.stats.facebookPages.toString(), color: 'blue', icon: 'facebook', trend: 'Synced' },
    { label: 'Active Campaigns', value: dashboardData.stats.activeCampaigns.toString(), color: 'orange', icon: 'campaign', trend: '+9%' },
    { label: 'Total Leads', value: dashboardData.stats.totalLeads.toLocaleString(), color: 'green', icon: 'user', trend: '+2.3K' },
    { label: 'Total Engagement', value: dashboardData.stats.totalEngagement.toLocaleString(), color: 'teal', icon: 'analytics', trend: '+24%' },
    { label: 'Recent Activities', value: dashboardData.recentActivities.length.toString(), color: 'info', icon: 'clock', trend: 'Live' },
  ];

  const heroSignals = [
    { label: 'Connected pages', value: dashboardData.stats.facebookPages.toString(), note: 'All tokens healthy' },
    { label: 'Active campaigns', value: dashboardData.stats.activeCampaigns.toString(), note: '12 awaiting review' },
    { label: 'Unread alerts', value: '9', note: '3 need attention' },
  ];

  const operationalSignals = [
    { label: 'Campaign health', value: dashboardData.operationalSignals.campaignHealth || 0, note: 'Stable delivery', color: 'blue' },
    { label: 'Lead capture', value: dashboardData.operationalSignals.leadCapture || 0, note: 'Strong conversion trend', color: 'green' },
    { label: 'Verification queue', value: dashboardData.operationalSignals.verificationQueue || 0, note: '4 items need review', color: 'orange' },
  ];

  const recentActivities = dashboardData.recentActivities.slice(0, 5).map((activity, idx) => ({
    id: activity._id || idx,
    user: user ? `${user.firstName} ${user.lastName}` : 'System',
    action: activity.name ? `Created campaign: ${activity.name}` : activity.action,
    module: 'Campaigns',
    time: new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: activity.status === 'active' ? 'success' : activity.status === 'paused' ? 'warning' : 'info',
  })) || [];

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content">
        <div className="error-state">
          <Icon name="error" size={48} />
          <p>Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

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
                <span>{dashboardData.operationalSignals.verificationQueue || 4} documents are waiting for approval.</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;