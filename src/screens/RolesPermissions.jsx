import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { roleService } from '../services/api';

const RolesPermissions = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    permissions: [],
  });

  const allPermissions = [
    { id: 'manage_users', label: 'Manage Users' },
    { id: 'manage_organizations', label: 'Manage Organizations' },
    { id: 'manage_campaigns', label: 'Manage Campaigns' },
    { id: 'manage_leads', label: 'Manage Leads' },
    { id: 'manage_documents', label: 'Manage Documents' },
    { id: 'manage_settings', label: 'Manage Settings' },
    { id: 'view_analytics', label: 'View Analytics' },
    { id: 'manage_audit', label: 'Manage Audit' },
    { id: 'manage_notifications', label: 'Manage Notifications' },
    { id: 'manage_facebook', label: 'Manage Facebook' },
    { id: 'manage_roles', label: 'Manage Roles' },
    { id: 'export_data', label: 'Export Data' },
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await roleService.getRoles();
        const rolesData = (response.data?.data || []).map((role) => ({
          id: role._id,
          name: role.name,
          description: role.description || '',
          permissions: role.permissions || [],
          isSystem: role.isSystem,
          createdAt: role.createdAt,
        }));
        setRoles(rolesData);
      } catch (err) {
        setError(err.message || 'Failed to load roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleCreate = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      roleName: '',
      description: '',
      permissions: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await roleService.createRole({
        name: formData.roleName,
        description: formData.description,
        permissions: formData.permissions,
      });

      const response = await roleService.getRoles();
      const rolesData = (response.data?.data || []).map((role) => ({
        id: role._id,
        name: role.name,
        description: role.description || '',
        permissions: role.permissions || [],
        isSystem: role.isSystem,
        createdAt: role.createdAt,
      }));
      setRoles(rolesData);

      handleCloseModal();
      alert('Role created successfully!');
    } catch (err) {
      alert('Error creating role: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId) => {
    setFormData((prev) => {
      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId];
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleDelete = async (id) => {
    try {
      await roleService.deleteRole(id);
      setRoles(roles.filter(role => role.id !== id));
      alert('Role deleted successfully');
    } catch (err) {
      alert('Error deleting role: ' + (err.response?.data?.error || err.message));
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="page-subtitle">Define access across modules and actions.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Role
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
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>System Role</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td><strong>{role.name}</strong></td>
                  <td>{role.description || '-'}</td>
                  <td>{role.permissions.length} permissions</td>
                  <td>
                    {role.isSystem ? (
                      <span className="badge badge-info">System</span>
                    ) : (
                      <span className="badge badge-secondary">Custom</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn" title="Edit">
                      <Icon name="edit" size={14} />
                    </button>
                    {!role.isSystem && (
                      <button
                        className="action-btn"
                        onClick={() => handleDelete(role.id)}
                        title="Delete"
                      >
                        <Icon name="delete" size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Role</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="required">Role Name</label>
                  <input
                    type="text"
                    name="roleName"
                    className="form-input"
                    placeholder="Enter role name"
                    value={formData.roleName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    placeholder="Enter role description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Permissions</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {allPermissions.map((permission) => (
                      <label key={permission.id} className="form-switch" style={{ margin: 0 }}>
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                        />
                        <span style={{ fontSize: '13px' }}>{permission.label}</span>
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
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;