import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { auditService } from '../services/api';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedLog, setSelectedLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await auditService.getAuditLogs();
        const logsData = (response.data?.data || []).map((log) => ({
          id: log._id,
          user: log.user ? `${log.user.firstName} ${log.user.lastName}` : 'Unknown User',
          organization: log.organization?.name || 'No Organization',
          action: log.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          module: log.resource || 'System',
          ipAddress: log.ip || 'N/A',
          date: new Date(log.createdAt).toISOString().split('T')[0],
          time: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: log.status,
          details: JSON.stringify(log.details || {}),
        }));
        setLogs(logsData);
      } catch (err) {
        setError(err.message || 'Failed to load audit logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'badge-success';
      case 'failed': return 'badge-danger';
      case 'warning': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading audit logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Inspect user actions and system events.</p>
        </div>
        <div className="page-actions">
          <select className="form-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ width: '140px' }}>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <Icon name="error" size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search logs..."
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
                  <td>{log.user}</td>
                  <td>{log.organization}</td>
                  <td>{log.action}</td>
                  <td>{log.module}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{log.ipAddress}</td>
                  <td>{log.date}</td>
                  <td>{log.time}</td>
                  <td>
                    <span className={`badge ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-btn"
                      onClick={() => setSelectedLog(log)}
                      title="View Details"
                    >
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
            <span>Showing 1-{filteredLogs.length} of {logs.length} results</span>
          </div>
          <div className="pagination-controls">
            <button className="btn-icon" disabled>
              <Icon name="chevronLeft" size={14} />
            </button>
            <button className="btn-icon">
              <Icon name="chevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Audit Log Details</h3>
              <button className="modal-close" onClick={() => setSelectedLog(null)}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>User</label>
                <p>{selectedLog.user}</p>
              </div>
              <div className="form-group">
                <label>Organization</label>
                <p>{selectedLog.organization}</p>
              </div>
              <div className="form-group">
                <label>Action</label>
                <p>{selectedLog.action}</p>
              </div>
              <div className="form-group">
                <label>IP Address</label>
                <p style={{ fontFamily: 'monospace' }}>{selectedLog.ipAddress}</p>
              </div>
              <div className="form-group">
                <label>Status</label>
                <p>
                  <span className={`badge ${getStatusColor(selectedLog.status)}`}>
                    {selectedLog.status}
                  </span>
                </p>
              </div>
              <div className="form-group">
                <label>Details</label>
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflowX: 'auto' }}>
                  {selectedLog.details}
                </pre>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelectedLog(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;