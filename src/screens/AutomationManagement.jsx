import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { campaignService } from '../services/api';

const AutomationManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        // Get campaigns with automation type as proxy for automations
        const response = await campaignService.getCampaigns();
        const automationsData = (response.data?.data || [])
          .filter(c => c.type === 'automated')
          .map((c, idx) => ({
            id: c._id,
            name: c.name,
            organization: c.organization?.name || 'No Organization',
            page: c.pages?.map(p => p.pageName).join(', ') || 'No Pages',
            trigger: c.content?.message ? 'Content' : 'Schedule',
            action: 'Auto Post',
            status: c.status,
            createdDate: new Date(c.createdAt).toISOString().split('T')[0],
            type: c.type,
          }));
        setAutomations(automationsData);
      } catch (err) {
        setError(err.message || 'Failed to load automations');
      } finally {
        setLoading(false);
      }
    };

    fetchAutomations();
  }, []);

  const [formData, setFormData] = useState({
    automationName: '',
    organization: '',
    page: '',
    trigger: '',
    action: '',
    status: 'Enabled',
  });

  const triggers = ['New Comment', 'New Page Message', 'New Post', 'Message Received', 'New Lead'];
  const actions = ['Send Message', 'Add Tag', 'Send Reaction', 'Send Comment', 'Send Follow-up Template', 'Create Lead'];
  const statuses = ['Enabled', 'Disabled'];

  const handleCreate = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ automationName: '', organization: '', page: '', trigger: '', action: '', status: 'Enabled' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await campaignService.createCampaign({
        name: formData.automationName,
        organization: formData.organization,
        type: 'automated',
        status: formData.status === 'Enabled' ? 'active' : 'paused',
        content: {
          message: formData.action,
        },
        scheduling: {},
      });

      const response = await campaignService.getCampaigns();
      const automationsData = (response.data?.data || [])
        .filter(c => c.type === 'automated')
        .map((c) => ({
          id: c._id,
          name: c.name,
          organization: c.organization?.name || 'No Organization',
          page: c.pages?.map(p => p.pageName).join(', ') || 'No Pages',
          trigger: c.content?.message ? 'Content' : 'Schedule',
          action: 'Auto Post',
          status: c.status,
          createdDate: new Date(c.createdAt).toISOString().split('T')[0],
          type: c.type,
        }));
      setAutomations(automationsData);

      handleCloseModal();
      alert('Automation created successfully!');
    } catch (err) {
      alert('Error creating automation: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAutomations = automations.filter((automation) =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      if (currentStatus === 'active') {
        await campaignService.pauseCampaign(id);
        setAutomations(automations.map(a =>
          a.id === id ? { ...a, status: 'paused' } : a
        ));
      } else {
        await campaignService.resumeCampaign(id);
        setAutomations(automations.map(a =>
          a.id === id ? { ...a, status: 'active' } : a
        ));
      }
      alert('Automation status updated!');
    } catch (err) {
      alert('Error updating automation: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleAction = (action, automation) => {
    switch (action) {
      case 'View':
        alert(`Viewing: ${automation.name}`);
        break;
      case 'Edit':
        alert(`Editing: ${automation.name}`);
        break;
      case 'Delete':
        if (window.confirm(`Delete "${automation.name}"?`)) {
          campaignService.deleteCampaign(automation.id).then(() => {
            setAutomations(automations.filter(a => a.id !== automation.id));
            alert('Automation deleted successfully');
          });
        }
        break;
      case 'Enable':
        handleStatusToggle(automation.id, automation.status);
        break;
      case 'Disable':
        handleStatusToggle(automation.id, automation.status);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading automations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Automation Management</h1>
          <p className="page-subtitle">Build trigger-based workflows that save time.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Automation
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
                <th className="checkbox-cell"><input type="checkbox" /></th>
                <th>Automation Name</th>
                <th>Organization</th>
                <th>Page</th>
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
                  <td className="checkbox-cell"><input type="checkbox" /></td>
                  <td><strong>{automation.name}</strong></td>
                  <td>{automation.organization}</td>
                  <td>{automation.page}</td>
                  <td>{automation.trigger}</td>
                  <td>{automation.action}</td>
                  <td>
                    <span className={`badge ${automation.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                      {automation.status === 'active' ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td>{automation.createdDate}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleAction('View', automation)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Edit', automation)} title="Edit">
                      <Icon name="edit" size={14} />
                    </button>
                    {automation.status === 'active' && (
                      <button className="action-btn" onClick={() => handleAction('Disable', automation)} title="Disable">
                        <Icon name="pause" size={14} />
                      </button>
                    )}
                    {automation.status === 'paused' && (
                      <button className="action-btn" onClick={() => handleAction('Enable', automation)} title="Enable">
                        <Icon name="play" size={14} />
                      </button>
                    )}
                    <button className="action-btn" onClick={() => handleAction('Delete', automation)} title="Delete">
                      <Icon name="delete" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            <span>Showing 1-{filteredAutomations.length} of {automations.length} results</span>
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
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Page</label>
                    <select name="page" className="form-select" value={formData.page} onChange={handleChange} required>
                      <option value="">Select Page</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Trigger</label>
                    <select name="trigger" className="form-select" value={formData.trigger} onChange={handleChange} required>
                      <option value="">Select Trigger</option>
                      {triggers.map((trigger) => (
                        <option key={trigger} value={trigger}>{trigger}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Action</label>
                    <select name="action" className="form-select" value={formData.action} onChange={handleChange} required>
                      <option value="">Select Action</option>
                      {actions.map((action) => (
                        <option key={action} value={action}>{action}</option>
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
                  Create Automation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationManagement;