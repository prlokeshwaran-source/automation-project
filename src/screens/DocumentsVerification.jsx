import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { documentService } from '../services/api';

const DocumentsVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await documentService.getDocuments();
        const docsData = (response.data?.data || []).map((doc) => ({
          id: doc._id,
          organization: doc.organization?.name || 'No Organization',
          documentType: doc.documentType,
          documentNumber: doc.documentNumber || 'N/A',
          uploadedDate: new Date(doc.createdAt).toISOString().split('T')[0],
          status: doc.status,
          remarks: doc.verificationNotes || '',
          userId: doc.user?._id,
          userName: doc.user ? `${doc.user.firstName} ${doc.user.lastName}` : 'Unknown',
        }));
        setDocuments(docsData);
      } catch (err) {
        setError(err.message || 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const documentTypes = ['identity', 'business_license', 'tax_document', 'other'];
  const statusOptions = ['pending', 'review', 'approved', 'rejected'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusUpdate = async (docId, newStatus) => {
    try {
      if (newStatus === 'approved') {
        await documentService.approveDocument(docId);
      } else if (newStatus === 'rejected') {
        const notes = prompt('Enter verification notes:');
        if (notes !== null) {
          await documentService.rejectDocument(docId, notes);
        }
      } else {
        await documentService.updateDocument(docId, { status: newStatus });
      }

      setDocuments(documents.map(doc =>
        doc.id === docId ? { ...doc, status: newStatus } : doc
      ));

      alert(`Document ${newStatus} successfully`);
    } catch (err) {
      alert('Error updating document: ' + (err.response?.data?.error || err.message));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'review': return 'badge-info';
      case 'rejected': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documents & Verification</h1>
          <p className="page-subtitle">Approve and review organization documents</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline">
            <Icon name="export" size={16} style={{ marginRight: '6px' }} />
            Export
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
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '160px' }}>
            <option value="all">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Document Type</th>
                <th>Document Number</th>
                <th>Uploaded Date</th>
                <th>Status</th>
                <th>Remarks</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.organization}</td>
                  <td>{doc.documentType}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{doc.documentNumber}</td>
                  <td>{doc.uploadedDate}</td>
                  <td>
                    <span className={`badge ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>{doc.remarks || '-'}</td>
                  <td className="actions-cell">
                    {doc.status === 'pending' && (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusUpdate(doc.id, 'review')}
                          title="Mark as Review"
                        >
                          <Icon name="eye" size={14} />
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusUpdate(doc.id, 'approved')}
                          title="Approve"
                        >
                          <Icon name="check" size={14} />
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                          title="Reject"
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </>
                    )}
                    {doc.status === 'review' && (
                      <>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusUpdate(doc.id, 'approved')}
                          title="Approve"
                        >
                          <Icon name="check" size={14} />
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                          title="Reject"
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentsVerification;