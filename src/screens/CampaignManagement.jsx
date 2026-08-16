import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const CampaignManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2025',
      organization: 'Acme Corp',
      page: 'Acme Corp Official Page',
      type: 'Engagement',
      status: 'Active',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      createdBy: 'John Smith',
    },
    {
      id: 2,
      name: 'New Product Launch',
      organization: 'Beta Ltd',
      page: 'Beta Ltd Community',
      type: 'Lead Generation',
      status: 'Active',
      startDate: '2025-05-15',
      endDate: '2025-07-15',
      createdBy: 'Sarah Johnson',
    },
    {
      id: 3,
      name: 'Brand Awareness Q2',
      organization: 'Gamma Inc',
      page: 'Gamma Inc Marketing',
      type: 'Brand Awareness',
      status: 'Paused',
      startDate: '2025-04-01',
      endDate: '2025-05-31',
      createdBy: 'Mike Wilson',
    },
    {
      id: 4,
      name: 'Holiday Campaign',
      organization: 'Delta Corp',
      page: 'Delta Corp Support',
      type: 'Engagement',
      status: 'Draft',
      startDate: '2025-06-15',
      endDate: '2025-07-15',
      createdBy: 'Emma Davis',
    },
    {
      id: 5,
      name: 'Retargeting Q2',
      organization: 'Acme Corp',
      page: 'Acme Corp Official Page',
      type: 'Retargeting',
      status: 'Active',
      startDate: '2025-05-20',
      endDate: '2025-06-20',
      createdBy: 'John Smith',
    },
  ]);

  const [formData, setFormData] = useState({
    campaignName: '',
    organization: '',
    page: '',
    campaignType: '',
    status: 'Active',
    startDate: '',
    endDate: '',
  });

  const campaignTypes = ['Engagement', 'Lead Generation', 'Brand Awareness', 'Retargeting', 'Conversions'];
  const organizations = ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta Corp', 'Epsilon LLC'];
  const pages = ['Acme Corp Official Page', 'Beta Ltd Community', 'Gamma Inc Marketing', 'Delta Corp Support', 'Epsilon LLC Store'];
  const statuses = ['Active', 'Paused', 'Draft', 'Completed'];

  const handleCreate = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      campaignName: '',
      organization: '',
      page: '',
      campaignType: '',
      status: 'Active',
      startDate: '',
      endDate: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      id: campaigns.length + 1,
      name: formData.campaignName,
      organization: formData.organization,
      page: formData.page,
      type: formData.campaignType,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      createdBy: 'Current User',
    };
    setCampaigns([...campaigns, newCampaign]);
    handleCloseModal();
    alert('Campaign created successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || campaign.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAction = (action, campaign) => {
    alert(`${action} campaign: ${campaign.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'Paused': return 'badge-warning';
      case 'Draft': return 'badge-secondary';
      case 'Completed': return 'badge-info';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Campaign Management</h1>
          <p className="page-subtitle">Manage Facebook ad campaigns</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            <span style={{ marginRight: '6px' }}>+</span>
            Create Campaign
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-actions">
          <div className="table-search">
            <Icon name="search" size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '160px' }}>
            <option value="all">All Types</option>
            {campaignTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="checkbox-cell"><input type="checkbox" /></th>
                <th>Campaign Name</th>
                <th>Organization</th>
                <th>Page</th>
                <th>Campaign Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created By</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="checkbox-cell"><input type="checkbox" /></td>
                  <td><strong>{campaign.name}</strong></td>
                  <td>{campaign.organization}</td>
                  <td>{campaign.page}</td>
                  <td>{campaign.type}</td>
                  <td><span className={`badge ${getStatusColor(campaign.status)}`}>{campaign.status}</span></td>
                  <td>{campaign.startDate}</td>
                  <td>{campaign.endDate}</td>
                  <td>{campaign.createdBy}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => handleAction('View', campaign)} title="View">
                      <Icon name="view" size={14} />
                    </button>
                    <button className="action-btn" onClick={() => handleAction('Edit', campaign)} title="Edit">
                      <Icon name="edit" size={14} />
                    </button>
                    {campaign.status === 'Active' && (
                      <button className="action-btn" onClick={() => handleAction('Pause', campaign)} title="Pause">
                        <Icon name="pause" size={14} />
                      </button>
                    )}
                    {campaign.status === 'Paused' && (
                      <button className="action-btn" onClick={() => handleAction('Resume', campaign)} title="Resume">
                        <Icon name="play" size={14} />
                      </button>
                    )}
                    <button className="action-btn" onClick={() => handleAction('Delete', campaign)} title="Delete">
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
              <h3 className="modal-title">Create New Campaign</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icon name="close" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="required">Campaign Name</label>
                  <input
                    type="text"
                    name="campaignName"
                    className="form-input"
                    placeholder="Enter campaign name"
                    value={formData.campaignName}
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
                    <label className="required">Page</label>
                    <select name="page" className="form-select" value={formData.page} onChange={handleChange} required>
                      <option value="">Select Page</option>
                      {pages.map((page) => <option key={page} value={page}>{page}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Campaign Type</label>
                    <select name="campaignType" className="form-select" value={formData.campaignType} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      {campaignTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Status</label>
                    <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" name="startDate" className="form-input" value={formData.startDate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" name="endDate" className="form-input" value={formData.endDate} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;
