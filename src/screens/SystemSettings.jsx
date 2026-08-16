import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    systemName: 'Super Admin Panel',
    systemEmail: 'admin@company.com',
    timeZone: 'UTC+0',
    dateFormat: 'MM/DD/YYYY',
    language: 'English',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    fbAppId: '1087455536591192',
    fbAppSecret: '••••••••••••••••••',
    fbAccessToken: 'EAABsbxviN2cBA...',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert('System settings saved successfully!');
  };

  const timeZones = [
    'UTC-12:00 (International Date Line West)',
    'UTC-11:00 (Samoa)',
    'UTC-10:00 (Hawaii)',
    'UTC-8:00 (Pacific Time)',
    'UTC-7:00 (Mountain Time)',
    'UTC-6:00 (Central Time)',
    'UTC-5:00 (Eastern Time)',
    'UTC+0 (London)',
    'UTC+1:00 (Berlin)',
    'UTC+5:30 (Mumbai)',
    'UTC+8:00 (Singapore)',
    'UTC+9:00 (Tokyo)',
    'UTC+12:00 (Sydney)',
  ];

  const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic'];

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure system-wide settings</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Icon name="save" size={16} style={{ marginRight: '6px' }} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="tabs" style={{ marginBottom: '0', borderBottom: '1px solid var(--color-border)' }}>
          <button
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Settings
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security Settings
          </button>
          <button
            className={`tab ${activeTab === 'facebook' ? 'active' : ''}`}
            onClick={() => setActiveTab('facebook')}
          >
            Facebook API Settings
          </button>
        </div>

        <div className="card-body">
          {activeTab === 'general' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="required">System Name</label>
                  <input
                    type="text"
                    name="systemName"
                    className="form-input"
                    value={settings.systemName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="required">System Email</label>
                  <input
                    type="email"
                    name="systemEmail"
                    className="form-input"
                    value={settings.systemEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="required">Time Zone</label>
                  <select name="timeZone" className="form-select" value={settings.timeZone} onChange={handleChange}>
                    {timeZones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="required">Date Format</label>
                  <select name="dateFormat" className="form-select" value={settings.dateFormat} onChange={handleChange}>
                    {dateFormats.map((fmt) => (
                      <option key={fmt} value={fmt}>{fmt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="required">Language</label>
                <select name="language" className="form-select" value={settings.language} onChange={handleChange}>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <div className="form-group">
                <label className="form-switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                  <span>Email Notifications</span>
                </label>
              </div>
              <div className="form-group">
                <label className="form-switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={settings.pushNotifications}
                    onChange={handleChange}
                  />
                  <span>Push Notifications</span>
                </label>
              </div>
              <div className="form-group">
                <label className="form-switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={settings.smsNotifications}
                    onChange={handleChange}
                  />
                  <span>SMS Notifications</span>
                </label>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <div className="form-group">
                <label className="form-switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                  />
                  <span>Two-Factor Authentication</span>
                </label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    className="form-input"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password Expiry (days)</label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    className="form-input"
                    value={settings.passwordExpiry}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'facebook' && (
            <>
              <div className="form-group">
                <label>App ID</label>
                <input
                  type="text"
                  name="fbAppId"
                  className="form-input"
                  value={settings.fbAppId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>App Secret</label>
                <input
                  type="password"
                  name="fbAppSecret"
                  className="form-input"
                  value={settings.fbAppSecret}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Access Token</label>
                <input
                  type="text"
                  name="fbAccessToken"
                  className="form-input"
                  value={settings.fbAccessToken}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-outline btn-sm" style={{ marginTop: '8px' }}>
                <Icon name="test" size={14} style={{ marginRight: '6px' }} />
                Test Facebook API Connection
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
