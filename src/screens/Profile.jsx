import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    username: 'johnsmith',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (!passwordData.currentPassword) {
      alert('Please enter your current password!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your personal information</p>
        </div>
        <button className="btn btn-primary" onClick={handleSaveProfile}>
          <Icon name="save" size={16} style={{ marginRight: '6px' }} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="tabs" style={{ marginBottom: '0', borderBottom: '1px solid var(--color-border)' }}>
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </button>
          <button
            className={`tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>

        <div className="card-body">
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: '0' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  border: '2px dashed var(--color-border)',
                }}>
                  {profile.fullName.charAt(0)}
                </div>
                <button className="btn btn-outline btn-sm btn-block">
                  <Icon name="upload" size={14} style={{ marginRight: '6px' }} />
                  Upload Photo
                </button>
              </div>

              <div style={{ flex: 1, minWidth: '0' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="required">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-input"
                      value={profile.username}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="required">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={profile.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label className="required">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="required">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-input"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="required">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  <Icon name="save" size={16} style={{ marginRight: '6px' }} />
                  Change Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
