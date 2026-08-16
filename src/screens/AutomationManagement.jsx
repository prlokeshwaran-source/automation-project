import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const AutomationManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Lead Qualification Bot',
      organization: 'Acme Corp',
      page: 'Acme Corp Official Page',
      trigger: 'New Comment',
      action: 'Send Message + Add Tag',
      status: 'Enabled',
      createdDate: '2025-06-10',
    },
    {
      id: 2,
      name: 'Welcome Message Series',
      organization: 'Beta Ltd',
      page: 'Beta Ltd Community',
      trigger: 'New Page Message',
      action: 'Send Welcome Message',
      status: 'Enabled',
      createdDate: '2025-05-22',
    },
    {
      id: 3,
      name: 'Post Engagement Booster',
      organization: 'Gamma Inc',
      page: 'Gamma Inc Marketing',
      trigger: 'New Post',
      action: 'Send Reaction + Comment',
      status: 'Disabled',
      createdDate: '2025-04-15',
    },
    {
      id: 4,
      name: 'Customer Follow-up',
      organization: 'Delta Corp',
      page: 'Delta Corp Support',
      trigger: 'Message Received',
      action: 'Send Follow-up Template',
      status: 'Enabled',
      createdDate: '2025-06-01',
    },
  ]);

  const [formData, setFormData] = useState({
    automationName: '',
    organization: '',
    page: '',
    trigger: '',
    action: '',
    status: 'Enabled',
  });

  const organizations = ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta Corp', 'Epsilon LLC'];
  const pages = ['Acme Corp Official Page', 'Beta Ltd Community', 'Gamma Inc Marketing', 'Delta Corp Support', 'Epsilon LLC Store'];
  const triggers = ['New Comment', 'New Page Message', 'New Post', 'Message Received', 'New Lead'];
  const actions = ['Send Message', 'Add Tag', 'Send Reaction', 'Send Comment', 'Send Follow-up Template', 'Create Lead'];
  const statuses = ['Enabled', 'Disabled'];

  const handleCreate = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ automationName: '', organization: '', page: '', trigger: '', action: '', status: 'Enabled' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAutomation = {
      id: automations.length + 1,
      name: formData.automationName,
      organization: formData.organization,
      page: formData.page,
      trigger: formData.trigger,
      action: formData.action,
      status: formData.status,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAutomations([...automations, newAutomation]);
    handleCloseModal();
    alert('Automation created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAutomations = automations.filter((automation) =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Automation Management</h1>
          <p className="page-subtitle">Manage Facebook automation workflows</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Automation
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search automations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Automation Name</th>
                <th>Organization</th>
                <th>Facebook Page</th>
                <th>Trigger</th>
                <th>Action</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAutomations.map((automation) => (
                <tr key={automation.id}>
                  <td><strong>{automation.name}</strong></td>
                  <td>{automation.organization}</td>
                  <td>{automation.page}</td>
                  <td>{automation.trigger}</td>
                  <td>{automation.action}</td>
                  <td>
                    <span className={`badge ${automation.status === 'Enabled' ? 'badge-success' : 'badge-secondary'}`}>
                      {automation.status}
                    </span>
                  </td>
                  <td>{automation.createdDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" title="View"><Icon name="view" size={14} /></button>
                    <button className="action-btn" title="Edit"><Icon name="edit" size={14} /></button>
                    {automation.status === 'Enabled' ? (
                      <button className="action-btn" title="Disable"><Icon name="pause" size={14} /></button>
                    ) : (
                      <button className="action-btn" title="Enable"><Icon name="play" size={14} /></button>
                    )}
                    <button className="action-btn" title="Delete"><Icon name="delete" size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Automation</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="required">Automation Name</label>
                  <input
                    type="text"
                    name="automationName"
                    className="form-input"
                    placeholder="Enter automation name"
                    value={formData.automationName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Organization</label>
                    <select name="organization" className="form-select" value={formData.organization} onChange={handleChange} required>
                      <option value="">Select Organization</option>
                      {organizations.map((org) => <option key={org} value={org}>{org}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Facebook Page</label>
                    <select name="page" className="form-select" value={formData.page} onChange={handleChange} required>
                      <option value="">Select Page</option>
                      {pages.map((page) => <option key={page} value={page}>{page}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Trigger</label>
                    <select name="trigger" className="form-select" value={formData.trigger} onChange={handleChange} required>
                      <option value="">Select Trigger</option>
                      {triggers.map((trigger) => <option key={trigger} value={trigger}>{trigger}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Action</label>
                    <select name="action" className="form-select" value={formData.action} onChange={handleChange} required>
                      <option value="">Select Action</option>
                      {actions.map((action) => <option key={action} value={action}>{action}</option>)}
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
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Automation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationManagement;
