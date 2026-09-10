import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { organizationService } from '../services/api';

const OrganizationManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await organizationService.getOrganizations();
        const orgsData = (response.data?.data || []).map((org) => ({
          id: org._id,
          name: org.name,
          email: org.domain || 'N/A',
          phone: org.phone || 'N/A',
          website: org.website || 'N/A',
          address: org.address || 'N/A',
          admin: org.admin ? `${org.admin.firstName} ${org.admin.lastName}` : 'Not Assigned',
          businessType: org.type,
          status: org.status,
          createdDate: new Date(org.createdAt).toISOString().split('T')[0],
        }));
        setOrgs(orgsData);
      } catch (err) {
        setError(err.message || 'Failed to load organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  const [formData, setFormData] = useState({
    orgName: '',
    businessEmail: '',
    phone: '',
    website: '',
    address: '',
    businessType: '',
    assignAdmin: '',
    status: 'active',
  });

  const businessTypes = ['free', 'basic', 'premium', 'enterprise'];
  const statuses = ['active', 'inactive', 'suspended', 'pending'];

  const handleCreate = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      orgName: '',
      businessEmail: '',
      phone: '',
      website: '',
      address: '',
      businessType: 'free',
      assignAdmin: '',
      status: 'active',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await organizationService.createOrganization({
        name: formData.orgName,
        domain: formData.businessEmail,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        type: formData.businessType,
        admin: formData.assignAdmin,
        status: formData.status,
      });

      const response = await organizationService.getOrganizations();
      const orgsData = (response.data?.data || []).map((org) => ({
        id: org._id,
        name: org.name,
        email: org.domain || 'N/A',
        phone: org.phone || 'N/A',
        website: org.website || 'N/A',
        address: org.address || 'N/A',
        admin: org.admin ? `${org.admin.firstName} ${org.admin.lastName}` : 'Not Assigned',
        businessType: org.type,
        status: org.status,
        createdDate: new Date(org.createdAt).toISOString().split('T')[0],
      }));
      setOrgs(orgsData);

      handleCloseModal();
      alert('Organization created successfully!');
    } catch (err) {
      alert('Error creating organization: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOrgs = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (action, org) => {
    try {
      switch (action) {
        case 'View':
          alert(`Viewing: ${org.name}`);
          break;
        case 'Edit':
          alert(`Editing: ${org.name}`);
          break;
        case 'Delete':
          if (window.confirm(`Deactivate "${org.name}"?`)) {
            await organizationService.deleteOrganization(org.id);
            setOrgs(orgs.filter(o => o.id !== org.id));
            alert('Organization deactivated successfully');
          }
          break;
        default:
          break;
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading organizations...</p>
        </div>
      </div>
    );
  }

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
                    <span className={`badge ${org.status === 'active' ? 'badge-success' : org.status === 'inactive' ? 'badge-secondary' : org.status === 'suspended' ? 'badge-danger' : 'badge-warning'}`}>
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
                      {/* Admins would be fetched from API */}
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