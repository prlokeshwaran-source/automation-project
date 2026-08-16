import React from 'react';
import Icon from './ui/Icon';

const Topbar = ({ onToggleSidebar, user, onNavigate, screenMeta }) => {
  const dropdownItems = [
    { key: 'profile', label: 'Profile', onClick: () => onNavigate('profile') },
    { key: 'settings', label: 'Settings', onClick: () => onNavigate('settings') },
    { key: 'logout', label: 'Logout', onClick: () => onNavigate('logout') },
  ];

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'S';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="toggle-btn" onClick={onToggleSidebar} type="button" aria-label="Toggle navigation">
          <Icon name="menu" size={22} />
        </button>

        <div className="topbar-context">
          <span className="topbar-kicker">Super Admin Workspace</span>
          <div className="topbar-title-row">
            <h1 className="topbar-title">{screenMeta?.title || 'Dashboard'}</h1>
            <span className="topbar-live">
              <Icon name="activity" size={12} />
              Live
            </span>
          </div>
          <p className="topbar-subtitle">
            {screenMeta?.subtitle || 'Monitor users, operations, and performance from one place.'}
          </p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box topbar-search">
          <Icon name="search" size={16} color="var(--color-text-muted)" />
          <input type="search" placeholder="Search modules, users, reports" />
        </div>

        <button className="topbar-icon-btn" type="button" onClick={() => onNavigate('notifications')} aria-label="Notifications">
          <Icon name="notifications" size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="dropdown topbar-dropdown">
          <button className="profile-chip" type="button">
            <div className="profile-copy">
              <span className="profile-name">{user?.name || 'Super Admin'}</span>
              <span className="profile-role">{user?.role || 'Super Admin'}</span>
            </div>
            <div className="avatar topbar-avatar">{initials}</div>
            <Icon name="chevronDown" size={14} className="profile-chevron" />
          </button>
          <div className="dropdown-menu topbar-menu" style={{ minWidth: '180px' }}>
            {dropdownItems.map((item) => (
              <button key={item.key} className="dropdown-item" onClick={item.onClick}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
