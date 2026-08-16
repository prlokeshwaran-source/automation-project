import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const AdminManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Smith',
      username: 'johnsmith',
      email: 'john@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Super Admin',
      organization: 'Acme Corp',
      status: 'Active',
      createdDate: '2025-01-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      username: 'sarahj',
      email: 'sarah@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Admin',
      organization: 'Beta Ltd',
      status: 'Active',
      createdDate: '2025-02-20',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      username: 'mikew',
      email: 'mike@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Admin',
      organization: 'Gamma Inc',
      status: 'Inactive',
      createdDate: '2025-03-10',
    },
    {
      id: 4,
      name: 'Emma Davis',
      username: 'emmad',
      email: 'emma@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Moderator',
      organization: 'Acme Corp',
      status: 'Active',
      createdDate: '2025-04-05',
    },
    {
      id: 5,
      name: 'Robert Brown',
      username: 'robertb',
      email: 'robert@company.com',
      phone: '+1 (555) 567-8901',
      role: 'Admin',
      organization: 'Delta Corp',
      status: 'Active',
      createdDate: '2025-04-22',
    },
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: '',
    status: 'Active',
  });

  const roles = ['Super Admin', 'Admin', 'Moderator', 'Viewer'];
  const organizations = ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta Corp', 'Epsilon LLC'];
  const statuses = ['Active', 'Inactive'];

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      organization: '',
      role: '',
      status: 'Active',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const newAdmin = {
      id: admins.length + 1,
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      organization: formData.organization,
      status: formData.status,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAdmins([...admins, newAdmin]);
    handleCloseModal();
    alert('Admin created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, admin) => {
    console.log(action, admin);
    alert(`${action} admin: ${admin.name}`);
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Management</h1>
          <p className="page-subtitle">Manage all admin and staff users</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Admin
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search admins..."
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
                <th>Admin Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td className="checkbox-cell"><input type="checkbox" /></td>
                  <td><strong>{admin.name}</strong></td>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.role}</td>
                  <td>{admin.organization}</td>
                  <td>
                    <span className={`badge ${admin.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>{admin.createdDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleAction('View', admin)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Edit', admin)} title="Edit">
                      <Icon name="edit" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Delete', admin)} title="Delete">
                      <Icon name="delete" size={14} />
                    </button>
                    {admin.status === 'Inactive' && (
                      <button className="action-btn" onClick={() => handleAction('Activate', admin)} title="Activate">
                        <Icon name="activate" size={14} />
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
            <span>Showing 1-5 of 24 results</span>
          </div>
          <div className="pagination-controls">
            <button className="btn-icon" style={{ width: '32px', height: '32px' }} disabled>
              <Icon name="chevronLeft" size={14} />
            </button>
            <button className="btn-icon" style={{ width: '32px', height: '32px' }}>
              <Icon name="chevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Admin</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="required">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="required">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-input"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Enter email"
                      value={formData.email}
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
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-input"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-input"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Organization</label>
                    <select
                      name="organization"
                      className="form-select"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((org) => (
                        <option key={org} value={org}>{org}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="required">Status</label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {statuses.map((status) => (
                      <label key={status} className="form-switch" style={{ margin: 0 }}>
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={handleChange}
                          style={{ width: '18px', height: '18px' }}
                        />
                        <span style={{ fontSize: '13px' }}>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
