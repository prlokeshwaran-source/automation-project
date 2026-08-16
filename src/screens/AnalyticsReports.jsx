import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const AnalyticsReports = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const overviewStats = [
    { label: 'Total Campaigns', value: '42', color: 'blue' },
    { label: 'Total Reach', value: '842,341', color: 'green' },
    { label: 'Total Impressions', value: '1.2M', color: 'purple' },
    { label: 'Total Engagement', value: '58,392', color: 'orange' },
    { label: 'Total Leads', value: '1,893', color: 'teal' },
    { label: 'Total Comments', value: '12,456', color: 'blue' },
    { label: 'Total Clicks', value: '34,210', color: 'info' },
  ];

  const pagePerformance = [
    { page: 'Acme Corp Official Page', reach: '156,342', impressions: '245,678', engagement: '12,456', ctr: '4.8%' },
    { page: 'Beta Ltd Community', reach: '89,234', impressions: '134,567', engagement: '7,890', ctr: '5.2%' },
    { page: 'Gamma Inc Marketing', reach: '123,456', impressions: '189,012', engagement: '9,345', ctr: '4.7%' },
    { page: 'Delta Corp Support', reach: '67,890', impressions: '98,765', engagement: '4,234', ctr: '3.9%' },
  ];

  const campaignPerformance = [
    { name: 'Summer Sale 2025', reach: '201,342', impressions: '312,456', clicks: '12,456', leads: '892', cost: '$245.67' },
    { name: 'New Product Launch', reach: '156,789', impressions: '245,678', clicks: '10,234', leads: '1,234', cost: '$312.45' },
    { name: 'Brand Awareness Q2', reach: '189,012', impressions: '298,765', clicks: '8,765', leads: '345', cost: '$198.76' },
    { name: 'Holiday Campaign', reach: '98,765', impressions: '156,789', clicks: '5,432', leads: '678', cost: '$156.34' },
  ];

  const orgPerformance = [
    { org: 'Acme Corp', campaigns: 5, reach: '320,000', engagement: '18,000', leads: '1,200' },
    { org: 'Beta Ltd', campaigns: 3, reach: '156,000', engagement: '9,500', leads: '890' },
    { org: 'Gamma Inc', campaigns: 4, reach: '210,000', engagement: '12,300', leads: '560' },
    { org: 'Delta Corp', campaigns: 2, reach: '89,000', engagement: '5,200', leads: '430' },
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

  const exportReport = () => {
    alert('Exporting report...');
  };

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

      <div className="stats-grid">
        {overviewStats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Performance Overview</div>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === 'pages' ? 'active' : ''}`}
              onClick={() => setActiveTab('pages')}
            >
              Page Performance
            </button>
            <button
              className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
              onClick={() => setActiveTab('campaigns')}
            >
              Campaign Performance
            </button>
            <button
              className={`tab ${activeTab === 'orgs' ? 'active' : ''}`}
              onClick={() => setActiveTab('orgs')}
            >
              Organization Performance
            </button>
          </div>
        </div>

        <div className="card-body">
          {activeTab === 'overview' && (
            <>
              <div className="chart-container">
                {chartData.map((item) => (
                  <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px', justifyContent: 'flex-end' }}>
                    <div className="chart-bar" style={{ height: `${(item.value / 7000) * 100}%`, maxHeight: '200px' }}>
                      <span className="bar-value">{item.value.toLocaleString()}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{item.day}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'pages' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Page Name</th>
                    <th>Reach</th>
                    <th>Impressions</th>
                    <th>Engagement</th>
                    <th>CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {pagePerformance.map((page) => (
                    <tr key={page.page}>
                      <td>{page.page}</td>
                      <td>{page.reach}</td>
                      <td>{page.impressions}</td>
                      <td>{page.engagement}</td>
                      <td>{page.ctr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Reach</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Leads</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign) => (
                    <tr key={campaign.name}>
                      <td>{campaign.name}</td>
                      <td>{campaign.reach}</td>
                      <td>{campaign.impressions}</td>
                      <td>{campaign.clicks}</td>
                      <td>{campaign.leads}</td>
                      <td>{campaign.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orgs' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Campaigns</th>
                    <th>Reach</th>
                    <th>Engagement</th>
                    <th>Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {orgPerformance.map((org) => (
                    <tr key={org.org}>
                      <td>{org.org}</td>
                      <td>{org.campaigns}</td>
                      <td>{org.reach}</td>
                      <td>{org.engagement}</td>
                      <td>{org.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
