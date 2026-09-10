import React, { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const { user, updateProfile, updatePassword } = useAuth();

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
      });
    }
    setLoading(false);
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const [firstName, ...lastNameParts] = profile.fullName.split(' ');
      const lastName = lastNameParts.join(' ');

      await updateProfile({
        firstName: firstName || '',
        lastName: lastName || '',
        email: profile.email,
        username: profile.username,
        phone: profile.phone,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile: ' + (err.message || 'Unknown error'));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      alert('Please enter your current password!');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert('Error changing password: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading-state">
          <Icon name="loading" size={48} />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

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
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={profile.username}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
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
              <button type="submit" className="btn btn-primary">
                Save Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;