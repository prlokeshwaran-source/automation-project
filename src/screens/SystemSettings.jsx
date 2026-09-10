import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { settingsService } from '../services/api';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.getSettings();
        const settingsMap = {};
        (response.data?.data || []).forEach(setting => {
          settingsMap[setting.key] = {
            value: setting.value,
            name: setting.name,
            description: setting.description,
            category: setting.category,
            isSensitive: setting.isSensitive,
            isEditable: setting.isEditable,
          };
        });
        setSettings(settingsMap);
      } catch (err) {
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const handleSave = async () => {
    try {
      for (const [key, setting] of Object.entries(settings)) {
        if (setting.isEditable) {
          await settingsService.updateSetting(key, setting.value);
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Error saving settings: ' + (err.message || 'Unknown error'));
    }
  };

  const generalSettings = [
    { key: 'site_name', label: 'Site Name', description: 'Application name displayed in the header' },
    { key: 'site_description', label: 'Site Description', description: 'Brief description of the application' },
    { key: 'default_timezone', label: 'Default Timezone', description: 'Default timezone for the application' },
    { key: 'default_language', label: 'Default Language', description: 'Default language for the application' },
  ];

  const securitySettings = [
    { key: 'password_min_length', label: 'Minimum Password Length', description: 'Minimum password length requirement' },
    { key: 'max_login_attempts', label: 'Max Login Attempts', description: 'Maximum failed login attempts before lockout' },
    { key: 'session_timeout', label: 'Session Timeout (minutes)', description: 'Session timeout duration' },
  ];

  const notificationSettings = [
    { key: 'email_notifications', label: 'Email Notifications', description: 'Enable email notifications' },
    { key: 'push_notifications', label: 'Push Notifications', description: 'Enable push notifications' },
    { key: 'slack_notifications', label: 'Slack Notifications', description: 'Enable Slack notifications' },
  ];

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Tune the platform, security, and notifications.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            <Icon name="save" size={16} style={{ marginRight: '6px' }} />
            {saved ? 'Saved!' : 'Save Settings'}
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
        <div className="tabs" style={{ marginBottom: '0', borderBottom: '1px solid var(--color-border)' }}>
          <button className={`tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General</button>
          <button className={`tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security</button>
          <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</button>
        </div>

        <div className="card-body">
          {activeTab === 'general' && (
            <div className="form-grid">
              {generalSettings.map((setting) => (
                <div className="form-group" key={setting.key}>
                  <label>{setting.label}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={settings[setting.key]?.value || ''}
                    onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                    placeholder={setting.description}
                  />
                  <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px' }}>
                    {setting.description}
                  </small>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="form-grid">
              {securitySettings.map((setting) => (
                <div className="form-group" key={setting.key}>
                  <label>{setting.label}</label>
                  <input
                    type="number"
                    className="form-input"
                    value={settings[setting.key]?.value || ''}
                    onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                    placeholder={setting.description}
                  />
                  <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px' }}>
                    {setting.description}
                  </small>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="form-grid">
              {notificationSettings.map((setting) => (
                <div className="form-group" key={setting.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label className="form-switch" style={{ margin: 0 }}>
                    <input
                      type="checkbox"
                      checked={settings[setting.key]?.value === true}
                      onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                    />
                  </label>
                  <div style={{ flex: 1 }}>
                    <label>{setting.label}</label>
                    <small style={{ color: 'var(--color-text-secondary)', display: 'block' }}>
                      {setting.description}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;