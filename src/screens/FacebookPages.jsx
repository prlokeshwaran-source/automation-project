import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const FacebookPages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [pages, setPages] = useState([
    {
      id: 1,
      pageName: 'Acme Corp Official Page',
      pageId: '102837465012345',
      organization: 'Acme Corp',
      admin: 'John Smith',
      connectionStatus: 'Connected',
      accessTokenStatus: 'Valid',
      connectedDate: '2025-01-20',
    },
    {
      id: 2,
      pageName: 'Beta Ltd Community',
      pageId: '987654321098765',
      organization: 'Beta Ltd',
      admin: 'Sarah Johnson',
      connectionStatus: 'Connected',
      accessTokenStatus: 'Valid',
      connectedDate: '2025-02-15',
    },
    {
      id: 3,
      pageName: 'Gamma Inc Marketing',
      pageId: '456789123045678',
      organization: 'Gamma Inc',
      admin: 'Mike Wilson',
      connectionStatus: 'Disconnected',
      accessTokenStatus: 'Expired',
      connectedDate: '2025-03-10',
    },
    {
      id: 4,
      pageName: 'Delta Corp Support',
      pageId: '321654987032165',
      organization: 'Delta Corp',
      admin: 'Emma Davis',
      connectionStatus: 'Connected',
      accessTokenStatus: 'Valid',
      connectedDate: '2025-04-02',
    },
    {
      id: 5,
      pageName: 'Epsilon LLC Store',
      pageId: '654321098765432',
      organization: 'Epsilon LLC',
      admin: 'Robert Brown',
      connectionStatus: 'Pending',
      accessTokenStatus: 'Valid',
      connectedDate: '2025-04-18',
    },
  ]);

  const filteredPages = pages.filter((page) =>
    page.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageId.includes(searchTerm) ||
    page.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (page) => {
    alert(`Viewing page: ${page.pageName}\nPage ID: ${page.pageId}`);
  };

  const handleDisconnect = (page) => {
    if (window.confirm(`Disconnect "${page.pageName}"?`)) {
      const updated = pages.map((p) =>
        p.id === page.id
          ? { ...p, connectionStatus: 'Disconnected', accessTokenStatus: 'Expired' }
          : p
      );
      setPages(updated);
      alert('Page disconnected successfully!');
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Facebook Pages</h1>
          <p className="page-subtitle">Manage connected Facebook pages</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline">
            <Icon name="refresh" size={16} style={{ marginRight: '6px' }} />
            Sync Pages
          </button>
        </div>
      </div>

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
                <th>Admin</th>
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
                  <td>{page.admin}</td>
                  <td>
                    <span className={`badge ${page.connectionStatus === 'Connected' ? 'badge-success' : page.connectionStatus === 'Disconnected' ? 'badge-secondary' : 'badge-warning'}`}>
                      {page.connectionStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${page.accessTokenStatus === 'Valid' ? 'badge-success' : 'badge-danger'}`}>
                      {page.accessTokenStatus}
                    </span>
                  </td>
                  <td>{page.connectedDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleView(page)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    {page.connectionStatus !== 'Disconnected' && (
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
            <span>Showing 1-{filteredPages.length} of 12 results</span>
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
