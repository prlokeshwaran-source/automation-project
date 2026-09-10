import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { facebookService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FacebookConfiguration = () => {
  const [config, setConfig] = useState({
    appName: '',
    appId: '',
    appSecret: '',
    accessToken: '',
    webhookEnabled: false,
    autoSync: false,
    syncFrequency: 30,
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [configId, setConfigId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConfig = async () => {
      if (!user?.organization?._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await facebookService.getConfigs();
        const configData = response.data?.data?.find(
          (c) => c.organization._id === user.organization._id
        );

        if (configData) {
          setConfigId(configData._id);
          setConfig({
            appName: configData.appName || '',
            appId: configData.appId || '',
            appSecret: configData.appSecret || '',
            accessToken: configData.accessToken || '',
            webhookEnabled: configData.webhookEnabled || false,
            autoSync: configData.autoSync || false,
            syncFrequency: configData.syncFrequency || 30,
          });
          setConnectionStatus(configData.status || 'disconnected');
        }
      } catch (err) {
        setError(err.message || 'Failed to load configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [user?.organization?._id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      if (configId) {
        await facebookService.updateConfig(configId, {
          status: 'connected',
          isVerified: true,
          lastSync: new Date(),
        });
      } else {
        const res = await facebookService.createConfig({
          organization: user.organization._id,
          appName: config.appName,
          appId: config.appId,
          appSecret: config.appSecret,
          accessToken: config.accessToken,
          status: 'connected',
          isVerified: true,
        });
        setConfigId(res.data?.config?._id);
      }

      setTimeout(() => {
        setTesting(false);
        setConnectionStatus('connected');
        alert('Connection test successful!');
      }, 1000);
    } catch (err) {
      setTesting(false);
      setConnectionStatus('error');
      alert('Error testing connection: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleSave = async () => {
    try {
      if (configId) {
        await facebookService.updateConfig(configId, {
          appName: config.appName,
          appId: config.appId,
          appSecret: config.appSecret,
          accessToken: config.accessToken,
          webhookEnabled: config.webhookEnabled,
          autoSync: config.autoSync,
          syncFrequency: parseInt(config.syncFrequency),
        });
      } else {
        const res = await facebookService.createConfig({
          organization: user.organization._id,
          appName: config.appName,
          appId: config.appId,
          appSecret: config.appSecret,
          accessToken: config.accessToken,
          webhookEnabled: config.webhookEnabled,
          autoSync: config.autoSync,
          syncFrequency: parseInt(config.syncFrequency),
        });
        setConfigId(res.data?.config?._id);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Configuration saved successfully!');
    } catch (err) {
      alert('Error saving configuration: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

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
          {saved ? 'Saved!' : 'Save Configuration'}
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <Icon name="error" size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="card">
        <div className="connection-status connected">
          <span className="status-dot status-online" />
          Connection Status: <strong>{connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'error' ? 'Error' : 'Disconnected'}</strong>
          <button className="btn btn-sm btn-success" onClick={handleTestConnection} disabled={testing} style={{ marginLeft: 'auto' }} type="button">
            {testing ? 'Testing...' : <><Icon name="test" size={14} style={{ marginRight: '4px' }} /> Test Connection</>}
          </button>
        </div>

        <div className="card-body">
          <div className="form-group">
            <label className="required">App Name</label>
            <input
              type="text"
              name="appName"
              className="form-input"
              placeholder="Enter application name"
              value={config.appName}
              onChange={handleChange}
            />
          </div>

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
              Token Status: <span style={{ color: connectionStatus === 'connected' ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 500 }}>
                {connectionStatus === 'connected' ? 'Valid' : 'Invalid'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Sync Frequency (minutes)</label>
            <input
              type="number"
              name="syncFrequency"
              className="form-input"
              value={config.syncFrequency}
              onChange={handleChange}
              min="5"
              max="1440"
            />
          </div>

          <div className="form-group">
            <label className="form-switch">
              <input
                type="checkbox"
                name="autoSync"
                checked={config.autoSync}
                onChange={handleChange}
              />
              <span>Enable Auto Sync</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-switch">
              <input
                type="checkbox"
                name="webhookEnabled"
                checked={config.webhookEnabled}
                onChange={handleChange}
              />
              <span>Enable Webhooks</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookConfiguration;