import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { campaignService, organizationService, facebookService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CampaignManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [campaigns, setCampaigns] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaigns
        const campaignsRes = await campaignService.getCampaigns();
        const campaignsData = (campaignsRes.data?.data || []).map((c) => ({
          id: c._id,
          name: c.name,
          organization: c.organization?.name || 'No Organization',
          page: c.pages?.map(p => p.pageName).join(', ') || 'No Pages',
          type: c.type || 'standard',
          status: c.status,
          startDate: c.scheduling?.startDate ? new Date(c.scheduling.startDate).toISOString().split('T')[0] : 'N/A',
          endDate: c.scheduling?.endDate ? new Date(c.scheduling.endDate).toISOString().split('T')[0] : 'N/A',
          createdBy: c.createdBy ? `${c.createdBy.firstName} ${c.createdBy.lastName}` : 'Unknown',
          approvalStatus: c.approvalStatus,
        }));
        setCampaigns(campaignsData);

        // Fetch organizations for dropdown
        const orgRes = await organizationService.getOrganizations();
        setOrganizations((orgRes.data?.data || []).map(o => ({ id: o._id, name: o.name })));

        // Fetch Facebook pages for dropdown
        if (user?.organization?._id) {
          const pagesRes = await facebookService.getPages(user.organization._id);
          setPages(pagesRes.data?.pages || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.organization?._id]);

  const [formData, setFormData] = useState({
    campaignName: '',
    organization: '',
    page: '',
    campaignType: '',
    status: 'draft',
    startDate: '',
    endDate: '',
  });

  const campaignTypes = ['standard', 'automated', 'scheduled'];
  const statuses = ['draft', 'active', 'paused', 'completed', 'archived'];

  const handleCreate = () => setShowCreateModal(true);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      campaignName: '',
      organization: '',
      page: '',
      campaignType: '',
      status: 'draft',
      startDate: '',
      endDate: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await campaignService.createCampaign({
        name: formData.campaignName,
        organization: formData.organization,
        type: formData.type,
        pages: formData.page ? [formData.page] : [],
        status: formData.status,
        scheduling: {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
      });

      // Refresh campaigns
      const campaignsRes = await campaignService.getCampaigns();
      const campaignsData = (campaignsRes.data?.data || []).map((c) => ({
        id: c._id,
        name: c.name,
        organization: c.organization?.name || 'No Organization',
        page: c.pages?.map(p => p.pageName).join(', ') || 'No Pages',
        type: c.type || 'standard',
        status: c.status,
        startDate: c.scheduling?.startDate ? new Date(c.scheduling.startDate).toISOString().split('T')[0] : 'N/A',
        endDate: c.scheduling?.endDate ? new Date(c.scheduling.endDate).toISOString().split('T')[0] : 'N/A',
        createdBy: c.createdBy ? `${c.createdBy.firstName} ${c.createdBy.lastName}` : 'Unknown',
        approvalStatus: c.approvalStatus,
      }));
      setCampaigns(campaignsData);

      handleCloseModal();
      alert('Campaign created successfully!');
    } catch (err) {
      alert('Error creating campaign: ' + (err.response?.data?.error || err.message));
    }
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

  const handleAction = async (action, campaign) => {
    try {
      switch (action) {
        case 'View':
          alert(`Viewing: ${campaign.name}`);
          break;
        case 'Edit':
          alert(`Editing: ${campaign.name}`);
          break;
        case 'Pause':
          await campaignService.pauseCampaign(campaign.id);
          setCampaigns(campaigns.map(c => c.id === campaign.id ? { ...c, status: 'paused' } : c));
          alert('Campaign paused');
          break;
        case 'Resume':
          await campaignService.resumeCampaign(campaign.id);
          setCampaigns(campaigns.map(c => c.id === campaign.id ? { ...c, status: 'active' } : c));
          alert('Campaign resumed');
          break;
        case 'Delete':
          if (window.confirm(`Delete "${campaign.name}"?`)) {
            await campaignService.deleteCampaign(campaign.id);
            setCampaigns(campaigns.filter(c => c.id !== campaign.id));
            alert('Campaign deleted');
          }
          break;
        default:
          break;
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'paused': return 'badge-warning';
      case 'draft': return 'badge-secondary';
      case 'completed': return 'badge-info';
      default: return 'badge-secondary';
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading campaigns...</p>
        </div>
      </div>
    );
  }

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
                    {campaign.status === 'active' && (
                      <button className="action-btn" onClick={() => handleAction('Pause', campaign)} title="Pause">
                        <Icon name="pause" size={14} />
                      </button>
                    )}
                    {campaign.status === 'paused' && (
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
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Page</label>
                    <select name="page" className="form-select" value={formData.page} onChange={handleChange} required>
                      <option value="">Select Page</option>
                      {pages.map((page) => (
                        <option key={page._id} value={page._id}>{page.pageName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Campaign Type</label>
                    <select name="campaignType" className="form-select" value={formData.campaignType} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      {campaignTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="required">Status</label>
                    <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
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