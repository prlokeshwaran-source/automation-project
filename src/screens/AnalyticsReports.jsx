import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { analyticsService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AnalyticsReports = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [analytics, setAnalytics] = useState({
    overviewStats: {},
    pagePerformance: [],
    campaignPerformance: [],
    orgPerformance: [],
    chartData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.organization?._id) return;

      try {
        const dashboardRes = await analyticsService.getDashboardStats(user.organization._id);
        const leadRes = await analyticsService.getLeadAnalytics(user.organization._id);

        setAnalytics({
          overviewStats: {
            totalCampaigns: dashboardRes.data?.stats?.activeCampaigns || 0,
            totalReach: '0',
            totalImpressions: '0',
            totalEngagement: dashboardRes.data?.stats?.totalEngagement || '0',
            totalLeads: dashboardRes.data?.stats?.totalLeads || 0,
            totalComments: '0',
            totalClicks: '0',
          },
          pagePerformance: [],
          campaignPerformance: [],
          orgPerformance: [],
          leadStats: leadRes.data?.leadStats || [],
        });
      } catch (err) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.organization?._id, dateRange]);

  const overviewStats = [
    { label: 'Total Campaigns', value: analytics.overviewStats.totalCampaigns.toString(), color: 'blue' },
    { label: 'Total Reach', value: analytics.overviewStats.totalReach, color: 'green' },
    { label: 'Total Impressions', value: analytics.overviewStats.totalImpressions, color: 'purple' },
    { label: 'Total Engagement', value: analytics.overviewStats.totalEngagement.toLocaleString(), color: 'orange' },
    { label: 'Total Leads', value: analytics.overviewStats.totalLeads.toLocaleString(), color: 'teal' },
    { label: 'Total Comments', value: analytics.overviewStats.totalComments, color: 'blue' },
    { label: 'Total Clicks', value: analytics.overviewStats.totalClicks, color: 'info' },
  ];

  const exportReport = async () => {
    try {
      const response = await analyticsService.exportData(user.organization._id, { type: 'all' });
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8, ' + encodeURIComponent(dataStr);

      const exportFileDefaultName = 'analytics_report.json';

      const link = document.createElement('a');
      link.setAttribute('data', dataUri);
      link.setAttribute('href', dataUri);
      link.setAttribute('download', exportFileDefaultName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Report exported successfully!');
    } catch (err) {
      alert('Error exporting report: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics & Reports</h1>
          <p className="page-subtitle">View analytics and generate reports</p>
        </div>
        <div className="page-actions">
          <select className="form-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ width: '140px' }}>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="btn btn-outline" onClick={exportReport}>
            <Icon name="export" size={16} style={{ marginRight: '6px' }} />
            Export Report
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <Icon name="error" size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="stats-grid">
        {overviewStats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="error-banner" style={{ marginTop: '16px' }}>
          <Icon name="error" size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Lead source breakdown would go here */}
    </div>
  );
};

export default AnalyticsReports;