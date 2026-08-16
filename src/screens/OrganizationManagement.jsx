import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const OrganizationManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [orgs, setOrgs] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      email: 'business@acme.com',
      phone: '+1 (555) 123-4567',
      website: 'https://acme.com',
      address: '123 Business St, New York, NY 10001',
      admin: 'John Smith',
      businessType: 'Corporation',
      status: 'Active',
      createdDate: '2025-01-15',
    },
    {
      id: 2,
      name: 'Beta Ltd',
      email: 'contact@beta.com',
      phone: '+1 (555) 234-5678',
      website: 'https://beta.com',
      address: '456 Enterprise Ave, Los Angeles, CA 90001',
      admin: 'Sarah Johnson',
      businessType: 'LLC',
      status: 'Active',
      createdDate: '2025-02-20',
    },
    {
      id: 3,
      name: 'Gamma Inc',
      email: 'info@gamma.com',
      phone: '+1 (555) 345-6789',
      website: 'https://gamma.com',
      address: '789 Corporate Blvd, Chicago, IL 60601',
      admin: 'Mike Wilson',
      businessType: 'Startup',
      status: 'Inactive',
      createdDate: '2025-03-10',
    },
    {
      id: 4,
      name: 'Delta Corp',
      email: 'hello@delta.com',
      phone: '+1 (555) 456-7890',
      website: 'https://delta.com',
      address: '321 Market St, San Francisco, CA 94103',
      admin: 'Emma Davis',
      businessType: 'Corporation',
      status: 'Active',
      createdDate: '2025-04-05',
    },
  ]);

  const [formData, setFormData] = useState({
    orgName: '',
    businessEmail: '',
    phone: '',
    website: '',
    address: '',
    businessType: '',
    assignAdmin: '',
    status: 'Active',
  });

  const businessTypes = ['Corporation', 'LLC', 'Partnership', 'Startup', 'Non-Profit', 'Other'];
  const admins = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emma Davis', 'Robert Brown'];
  const statuses = ['Active', 'Inactive'];

  const handleCreate = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      orgName: '',
      businessEmail: '',
      phone: '',
      website: '',
      address: '',
      businessType: '',
      assignAdmin: '',
      status: 'Active',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrg = {
      id: orgs.length + 1,
      name: formData.orgName,
      email: formData.businessEmail,
      phone: formData.phone,
      website: formData.website,
      address: formData.address,
      admin: formData.assignAdmin,
      businessType: formData.businessType,
      status: formData.status,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setOrgs([...orgs, newOrg]);
    handleCloseModal();
    alert('Organization created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOrgs = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, org) => {
    alert(`${action} organization: ${org.name}`);
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Organization Management</h1>
          <p className="page-subtitle">Manage all organizations in the system</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Organization
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="checkbox-cell"><input type="checkbox" /></th>
                <th>Organization Name</th>
                <th>Business Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Address</th>
                <th>Admin</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgs.map((org) => (
                <tr key={org.id}>
                  <td className="checkbox-cell"><input type="checkbox" /></td>
                  <td><strong>{org.name}</strong></td>
                  <td>{org.email}</td>
                  <td>{org.phone}</td>
                  <td><a href={org.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{org.website}</a></td>
                  <td>{org.address}</td>
                  <td>{org.admin}</td>
                  <td>
                    <span className={`badge ${org.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                      {org.status}
                    </span>
                  </td>
                  <td>{org.createdDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleAction('View', org)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Edit', org)} title="Edit">
                      <Icon name="edit" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Delete', org)} title="Delete">
                      <Icon name="delete" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Organization</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="required">Organization Name</label>
                  <input
                    type="text"
                    name="orgName"
                    className="form-input"
                    placeholder="Enter organization name"
                    value={formData.orgName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Business Email</label>
                    <input
                      type="email"
                      name="businessEmail"
                      className="form-input"
                      placeholder="Enter business email"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      className="form-input"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Business Type</label>
                    <select
                      name="businessType"
                      className="form-select"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Business Type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="form-textarea"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Assign Admin</label>
                    <select
                      name="assignAdmin"
                      className="form-select"
                      value={formData.assignAdmin}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Admin</option>
                      {admins.map((admin) => (
                        <option key={admin} value={admin}>{admin}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationManagement;
