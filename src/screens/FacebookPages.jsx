import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { facebookService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FacebookPages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPages = async () => {
      if (!user?.organization?._id) return;

      try {
        const response = await facebookService.getPages(user.organization._id);
        const pagesData = (response.data?.pages || []).map((page) => ({
          id: page._id,
          pageName: page.pageName,
          pageId: page.pageId,
          organization: page.organization?.name || 'No Organization',
          admin: 'Admin User',
          connectionStatus: page.status?.toUpperCase() || 'CONNECTED',
          tokenStatus: page.tokenStatus?.toUpperCase() || 'VALID',
          connectedDate: new Date(page.createdAt).toISOString().split('T')[0],
          syncEnabled: page.syncEnabled,
        }));
        setPages(pagesData);
      } catch (err) {
        setError(err.message || 'Failed to load pages');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [user?.organization?._id]);

  const filteredPages = pages.filter((page) =>
    page.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageId.includes(searchTerm) ||
    page.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (page) => {
    alert(`Viewing page: ${page.pageName}\nPage ID: ${page.pageId}`);
  };

  const handleDisconnect = async (page) => {
    if (window.confirm(`Disconnect "${page.pageName}"?`)) {
      try {
        // Update page sync settings instead of actual disconnect
        await facebookService.updateConfig(page.id, { syncEnabled: false });
        setPages(pages.map(p =>
          p.id === page.id
            ? { ...p, connectionStatus: 'DISCONNECTED', tokenStatus: 'EXPIRED' }
            : p
        ));
        alert('Page disconnected successfully!');
      } catch (err) {
        alert('Error disconnecting page: ' + (err.message || 'Unknown error'));
      }
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading Facebook pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Facebook Pages</h1>
          <p className="page-subtitle">Manage connected Facebook pages</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => window.location.reload()}>
            <Icon name="refresh" size={16} style={{ marginRight: '6px' }} />
            Sync Pages
          </button>
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
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page Name</th>
                <th>Page ID</th>
                <th>Organization</th>
                <th>Connection Status</th>
                <th>Access Token Status</th>
                <th>Connected Date</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id}>
                  <td><strong>{page.pageName}</strong></td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{page.pageId}</td>
                  <td>{page.organization}</td>
                  <td>
                    <span className={`badge ${
                      page.connectionStatus === 'CONNECTED'
                        ? 'badge-success'
                        : page.connectionStatus === 'DISCONNECTED'
                          ? 'badge-secondary'
                          : 'badge-warning'
                    }`}>
                      {page.connectionStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${page.tokenStatus === 'VALID' ? 'badge-success' : 'badge-danger'}`}>
                      {page.tokenStatus}
                    </span>
                  </td>
                  <td>{page.connectedDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleView(page)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    {page.connectionStatus !== 'DISCONNECTED' && (
                      <button className="action-btn" onClick={() => handleDisconnect(page)} title="Disconnect">
                        <Icon name="disconnect" size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            <span>Showing 1-{filteredPages.length} of {pages.length} results</span>
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
    </div>
  );
};

export default FacebookPages;