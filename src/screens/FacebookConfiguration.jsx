import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const FacebookConfiguration = () => {
  const [config, setConfig] = useState({
    appId: '1087455536591192',
    appSecret: '********************',
    accessToken: 'EAABsbxviN2cBA...',
    businessManagerId: '102837465012345',
    redirectUrl: 'https://app.company.com/facebook/callback',
    webhookUrl: 'https://app.company.com/webhook/facebook',
  });
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setConnectionStatus('connected');
      alert('Connection test successful!');
    }, 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert('Configuration saved successfully!');
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <span className="page-kicker">Integration controls</span>
          <h1 className="page-title">Facebook Configuration</h1>
          <p className="page-subtitle">Configure your Facebook API integration</p>
        </div>
        <button className="btn btn-outline" onClick={handleSave} type="button">
          {saved ? <Icon name="check" size={16} style={{ marginRight: '6px' }} /> : <Icon name="save" size={16} style={{ marginRight: '6px' }} />}
          {saved ? 'Saved' : 'Save Configuration'}
        </button>
      </div>

      <div className="card">
        <div className="connection-status connected">
          <span className="status-dot status-online" />
          Connection Status: <strong>{connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}</strong>
          <button className="btn btn-sm btn-success" onClick={handleTestConnection} disabled={testing} style={{ marginLeft: 'auto' }} type="button">
            {testing ? 'Testing...' : <><Icon name="test" size={14} style={{ marginRight: '4px' }} /> Test Connection</>}
          </button>
        </div>

        <div className="card-body">
          <div className="form-group">
            <label className="required">App ID</label>
            <input
              type="text"
              name="appId"
              className="form-input"
              placeholder="Enter Facebook App ID"
              value={config.appId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="required">App Secret</label>
            <input
              type="password"
              name="appSecret"
              className="form-input"
              placeholder="Enter Facebook App Secret"
              value={config.appSecret}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="required">Access Token</label>
            <input
              type="text"
              name="accessToken"
              className="form-input"
              placeholder="Enter Facebook Access Token"
              value={config.accessToken}
              onChange={handleChange}
            />
            <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Token Status: <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Valid</span> (expires in 30 days)
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Business Manager ID</label>
              <input
                type="text"
                name="businessManagerId"
                className="form-input"
                placeholder="Enter Business Manager ID"
                value={config.businessManagerId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="required">Redirect URL</label>
              <input
                type="url"
                name="redirectUrl"
                className="form-input"
                placeholder="https://yourapp.com/callback"
                value={config.redirectUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="required">Webhook URL</label>
            <input
              type="url"
              name="webhookUrl"
              className="form-input"
              placeholder="https://yourapp.com/webhook"
              value={config.webhookUrl}
              onChange={handleChange}
            />
            <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Status: <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Active</span>
            </div>
          </div>

          <div className="form-group">
            <label>Access Token Status</label>
            <input
              type="text"
              className="form-input"
              readOnly
              value="Valid - expires on 2025-06-15"
              style={{ background: 'var(--color-input-bg)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookConfiguration;
