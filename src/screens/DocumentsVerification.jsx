import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const DocumentsVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [documents, setDocuments] = useState([
    {
      id: 1,
      organization: 'Acme Corp',
      documentType: 'Business License',
      documentNumber: 'BL-12345',
      uploadedDate: '2025-06-10',
      status: 'Approved',
      remarks: 'All documents verified',
      documentFile: 'business_license.pdf',
    },
    {
      id: 2,
      organization: 'Beta Ltd',
      documentType: 'Tax Registration',
      documentNumber: 'TR-67890',
      uploadedDate: '2025-06-08',
      status: 'Pending',
      remarks: 'Awaiting verification',
      documentFile: 'tax_registration.pdf',
    },
    {
      id: 3,
      organization: 'Gamma Inc',
      documentType: 'ID Proof',
      documentNumber: 'ID-98765',
      uploadedDate: '2025-06-05',
      status: 'Rejected',
      remarks: 'Document is blurry, please re-upload',
      documentFile: 'id_proof.jpg',
    },
    {
      id: 4,
      organization: 'Delta Corp',
      documentType: 'Address Proof',
      documentNumber: 'AP-45678',
      uploadedDate: '2025-06-01',
      status: 'Re-upload Requested',
      remarks: 'Please provide a clearer document',
      documentFile: 'address_proof.pdf',
    },
    {
      id: 5,
      organization: 'Epsilon LLC',
      documentType: 'Business License',
      documentNumber: 'BL-11111',
      uploadedDate: '2025-05-28',
      status: 'Approved',
      remarks: 'Verified successfully',
      documentFile: 'business_license.pdf',
    },
  ]);

  const documentTypes = ['Business License', 'Tax Registration', 'ID Proof', 'Address Proof', 'Bank Statement', 'Other'];
  const statusOptions = ['Approved', 'Pending', 'Rejected', 'Re-upload Requested'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusUpdate = (docId, newStatus) => {
    const updated = documents.map((doc) =>
      doc.id === docId ? { ...doc, status: newStatus } : doc
    );
    setDocuments(updated);
  };

  const handleAction = (action, doc) => {
    if (action === 'approve') {
      handleStatusUpdate(doc.id, 'Approved');
      alert(`Document approved: ${doc.organization}`);
    } else if (action === 'reject') {
      handleStatusUpdate(doc.id, 'Rejected');
      alert(`Document rejected: ${doc.organization}`);
    } else if (action === 'request') {
      handleStatusUpdate(doc.id, 'Re-upload Requested');
      alert(`Re-upload requested for: ${doc.organization}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Rejected': return 'badge-danger';
      case 'Re-upload Requested': return 'badge-info';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documents & Verification</h1>
          <p className="page-subtitle">Verify organization documents</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline">
            <Icon name="upload" size={16} style={{ marginRight: '6px' }} />
            Upload Document
          </button>
        </div>
      </div>

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
          <div style={{ display: 'flex', gap: '8px' }}>
            <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '160px' }}>
              <option value="all">All Types</option>
              {documentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '140px' }}>
              <option value="all">All Status</option>
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
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
                <th>Document File</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td><strong>{doc.organization}</strong></td>
                  <td>{doc.documentType}</td>
                  <td style={{ fontFamily: 'monospace' }}>{doc.documentNumber}</td>
                  <td>{doc.uploadedDate}</td>
                  <td>
                    <span className={`badge ${getStatusColor(doc.status)}`}>{doc.status}</span>
                  </td>
                  <td>{doc.remarks}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="doc-icon" style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                        <Icon name="file" size={14} />
                      </span>
                      <a href={doc.documentFile} style={{ color: 'var(--color-primary)', fontSize: '12px' }}>{doc.documentFile}</a>
                    </div>
                  </td>
                  <td className="actions-cell">
                    {doc.status === 'Pending' && (
                      <>
                        <button className="action-btn" title="Approve" onClick={() => handleAction('approve', doc)}>
                          <Icon name="approve" size={14} />
                        </button>
                        <button className="action-btn" title="Reject" onClick={() => handleAction('reject', doc)}>
                          <Icon name="reject" size={14} />
                        </button>
                        <button className="action-btn" title="Request Re-upload" onClick={() => handleAction('request', doc)}>
                          <Icon name="request" size={14} />
                        </button>
                      </>
                    )}
                    {doc.status === 'Re-upload Requested' && (
                      <>
                        <button className="action-btn" title="View" style={{ color: 'var(--color-info)' }}>
                          <Icon name="view" size={14} />
                        </button>
                        <button className="action-btn" title="Approve" onClick={() => handleAction('approve', doc)}>
                          <Icon name="approve" size={14} />
                        </button>
                      </>
                    )}
                    {doc.status === 'Approved' && (
                      <button className="action-btn" title="View">
                        <Icon name="view" size={14} />
                      </button>
                    )}
                    {doc.status === 'Rejected' && (
                      <>
                        <button className="action-btn" title="View">
                          <Icon name="view" size={14} />
                        </button>
                        <button className="action-btn" title="Approve" onClick={() => handleAction('approve', doc)}>
                          <Icon name="approve" size={14} />
                        </button>
                      </>
                    )}
                    <button className="action-btn" title="Download">
                      <Icon name="download" size={14} />
                    </button>
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
