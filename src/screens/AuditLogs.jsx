import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedLog, setSelectedLog] = useState(null);

  const [logs] = useState([
    {
      id: 1,
      user: 'John Smith',
      organization: 'Acme Corp',
      action: 'Created new campaign',
      module: 'Campaign Management',
      ipAddress: '192.168.1.100',
      date: '2025-06-10',
      time: '09:30:45',
      status: 'Success',
      details: 'Campaign "Summer Sale 2025" was created with budget $5000',
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      organization: 'Beta Ltd',
      action: 'Updated Facebook configuration',
      module: 'Facebook Configuration',
      ipAddress: '192.168.1.101',
      date: '2025-06-10',
      time: '08:15:22',
      status: 'Success',
      details: 'Updated App ID and Access Token for page "Beta Ltd Community"',
    },
    {
      id: 3,
      user: 'Mike Wilson',
      organization: 'Gamma Inc',
      action: 'Deleted admin user',
      module: 'Admin Management',
      ipAddress: '10.0.0.55',
      date: '2025-06-09',
      time: '14:22:18',
      status: 'Success',
      details: 'Admin user "testuser" was permanently deleted',
    },
    {
      id: 4,
      user: 'Emma Davis',
      organization: 'Acme Corp',
      action: 'Rejected document verification',
      module: 'Documents',
      ipAddress: '10.0.0.62',
      date: '2025-06-09',
      time: '11:45:33',
      status: 'Warning',
      details: 'Document ID-98765 was rejected due to poor image quality',
    },
    {
      id: 5,
      user: 'Robert Brown',
      organization: 'Delta Corp',
      action: 'Failed login attempt',
      module: 'Authentication',
      ipAddress: '203.0.113.45',
      date: '2025-06-08',
      time: '23:17:56',
      status: 'Failed',
      details: 'User "admin" login attempt failed from unrecognized IP address',
    },
    {
      id: 6,
      user: 'John Smith',
      organization: 'Acme Corp',
      action: 'Paused campaign',
      module: 'Campaign Management',
      ipAddress: '192.168.1.100',
      date: '2025-06-08',
      time: '16:30:00',
      status: 'Success',
      details: 'Campaign "Holiday Campaign" has been paused',
    },
    {
      id: 7,
      user: 'Sarah Johnson',
      organization: 'Beta Ltd',
      action: 'Created new organization',
      module: 'Organization Management',
      ipAddress: '192.168.1.101',
      date: '2025-06-07',
      time: '10:00:00',
      status: 'Success',
      details: 'New organization "Epsilon LLC" was created and assigned to admin Robert Brown',
    },
  ]);

  const filteredLogs = logs.filter((log) =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress.includes(searchTerm)
  );

  const handleView = (log) => {
    setSelectedLog(log);
  };

  const handleClose = () => {
    setSelectedLog(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'badge-success';
      case 'Failed': return 'badge-danger';
      case 'Warning': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Track all system activities and changes</p>
        </div>
        <div className="page-actions">
          <select className="form-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search logs by user, action, module or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Organization</th>
                <th>Action</th>
                <th>Module</th>
                <th>IP Address</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td><strong>{log.user}</strong></td>
                  <td>{log.organization}</td>
                  <td>{log.action}</td>
                  <td>{log.module}</td>
                  <td style={{ fontFamily: 'monospace' }}>{log.ipAddress}</td>
                  <td>{log.date}</td>
                  <td>{log.time}</td>
                  <td>
                    <span className={`badge ${getStatusColor(log.status)}`}>{log.status}</span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn" title="View Details" onClick={() => handleView(log)}>
                      <Icon name="view" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            <span>Showing 1-7 of 156 results</span>
          </div>
          <div className="pagination-controls">
            <button className="btn-icon"><Icon name="chevronLeft" size={14} /></button>
            <button className="btn-icon"><Icon name="chevronRight" size={14} /></button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Audit Log Details</h3>
              <button className="modal-close" onClick={handleClose}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>User</label>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{selectedLog.user}</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Organization</label>
                  <div style={{ fontSize: '14px' }}>{selectedLog.organization}</div>
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Module</label>
                  <div style={{ fontSize: '14px' }}>{selectedLog.module}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Date</label>
                  <div style={{ fontSize: '14px' }}>{selectedLog.date}</div>
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Time</label>
                  <div style={{ fontSize: '14px' }}>{selectedLog.time}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>IP Address</label>
                  <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>{selectedLog.ipAddress}</div>
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Status</label>
                  <div>
                    <span className={`badge ${getStatusColor(selectedLog.status)}`}>{selectedLog.status}</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Action</label>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{selectedLog.action}</div>
              </div>
              <div className="form-group">
                <label style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Details</label>
                <div style={{ fontSize: '14px', padding: '12px', background: 'var(--color-input-bg)', borderRadius: '8px' }}>
                  {selectedLog.details}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
