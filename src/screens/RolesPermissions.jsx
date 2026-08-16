import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const RolesPermissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [roles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features and settings',
      usersCount: 1,
      permissions: {
        dashboard: { view: true, create: true, edit: true, delete: true },
        pages: { view: true, create: true, edit: true, delete: true },
        messages: { view: true, create: true, edit: true, delete: true },
        comments: { view: true, create: true, edit: true, delete: true },
        automation: { view: true, create: true, edit: true, delete: true },
        campaigns: { view: true, create: true, edit: true, delete: true },
        leads: { view: true, create: true, edit: true, delete: true },
        analytics: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
      },
      status: 'Active',
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Full access except system settings and role management',
      usersCount: 8,
      permissions: {
        dashboard: { view: true, create: true, edit: true, delete: true },
        pages: { view: true, create: true, edit: true, delete: true },
        messages: { view: true, create: true, edit: true, delete: true },
        comments: { view: true, create: true, edit: true, delete: true },
        automation: { view: true, create: true, edit: true, delete: true },
        campaigns: { view: true, create: true, edit: true, delete: true },
        leads: { view: true, create: true, edit: true, delete: true },
        analytics: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: false, edit: false, delete: false },
      },
      status: 'Active',
    },
    {
      id: 3,
      name: 'Moderator',
      description: 'Can manage campaigns, pages, and content moderation',
      usersCount: 15,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        pages: { view: true, create: true, edit: true, delete: false },
        messages: { view: true, create: true, edit: true, delete: false },
        comments: { view: true, create: true, edit: true, delete: true },
        automation: { view: true, create: false, edit: false, delete: false },
        campaigns: { view: true, create: true, edit: true, delete: false },
        leads: { view: true, create: false, edit: false, delete: false },
        analytics: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
      status: 'Active',
    },
    {
      id: 4,
      name: 'Viewer',
      description: 'Read-only access to campaigns and analytics',
      usersCount: 5,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        pages: { view: true, create: false, edit: false, delete: false },
        messages: { view: true, create: false, edit: false, delete: false },
        comments: { view: true, create: false, edit: false, delete: false },
        automation: { view: true, create: false, edit: false, delete: false },
        campaigns: { view: true, create: false, edit: false, delete: false },
        leads: { view: true, create: false, edit: false, delete: false },
        analytics: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        users: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
      status: 'Inactive',
    },
  ]);

  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    status: 'Active',
  });

  const permissionModules = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'pages', label: 'Pages' },
    { key: 'messages', label: 'Messages' },
    { key: 'comments', label: 'Comments' },
    { key: 'automation', label: 'Automation' },
    { key: 'campaigns', label: 'Campaigns' },
    { key: 'leads', label: 'Leads' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'reports', label: 'Reports' },
    { key: 'users', label: 'Users' },
    { key: 'settings', label: 'Settings' },
  ];

  const permissionActions = [
    { key: 'view', label: 'View' },
    { key: 'create', label: 'Create' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
  ];

  const [permissionOverrides, setPermissionOverrides] = useState({});

  const handleCreate = () => {
    setShowModal(true);
    setEditingRole(null);
    setPermissionOverrides({});
    setFormData({ roleName: '', description: '', status: 'Active' });
  };

  const handleEdit = (role) => {
    setShowModal(true);
    setEditingRole(role);
    setFormData({ roleName: role.name, description: role.description, status: role.status });
    setPermissionOverrides({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null);
    setPermissionOverrides({});
    setFormData({ roleName: '', description: '', status: 'Active' });
  };

  const handlePermissionToggle = (module, action) => {
    setPermissionOverrides((prev) => {
      const current = editingRole ? editingRole.permissions[module]?.[action] : false;
      const overrides = prev[module] || {};
      return {
        ...prev,
        [module]: { ...overrides, [action]: !current && !overrides[action] ? true : false },
      };
    });
  };

  const isPermissionChecked = (module, action) => {
    if (permissionOverrides[module]?.[action] !== undefined) {
      return permissionOverrides[module]?.[action];
    }
    return editingRole?.permissions[module]?.[action] || false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(editingRole ? 'Role updated!' : 'Role created!');
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status) => (status === 'Active' ? 'badge-success' : 'badge-secondary');

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="page-subtitle">Manage user roles and their permissions</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <span style={{ marginRight: '6px' }}>+</span>
          Create Role
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Description</th>
                <th>Users Count</th>
                <th>Permissions</th>
                <th>Status</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td><strong>{role.name}</strong></td>
                  <td>{role.description}</td>
                  <td>{role.usersCount}</td>
                  <td>
                    {permissionModules.filter((mod) =>
                      Object.values(role.permissions[mod.key] || {}).some(Boolean)
                    ).length} / {permissionModules.length} modules
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(role.status)}`}>{role.status}</span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn" title="Edit" onClick={() => handleEdit(role)}>
                      <Icon name="edit" size={14} />
                    </button>
                    <button className="action-btn" title="Delete">
                      <Icon name="delete" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingRole ? 'Edit Role' : 'Create New Role'}</h3>
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
                    rows={2}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Status</label>
                    <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="required">Permissions</label>
                  <div className="permission-matrix">
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid var(--color-border)' }}>Module</th>
                          {permissionActions.map((action) => (
                            <th key={action.key} style={{ padding: '8px', borderBottom: '2px solid var(--color-border)' }}>{action.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {permissionModules.map((module) => (
                          <tr key={module.key}>
                            <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>{module.label}</td>
                            {permissionActions.map((action) => (
                              <td key={`${module.key}-${action.key}`} style={{ padding: '8px', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
                                <input
                                  type="checkbox"
                                  checked={isPermissionChecked(module.key, action.key)}
                                  onChange={() => handlePermissionToggle(module.key, action.key)}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingRole ? 'Update Role' : 'Create Role'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
