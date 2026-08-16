import React from 'react';
import Icon from './ui/Icon';

const Topbar = ({ onToggleSidebar, user, onNavigate }) => {
  const dropdownItems = [
    { key: 'profile', label: 'Profile', onClick: () => onNavigate('profile') },
    { key: 'settings', label: 'Settings', onClick: () => onNavigate('settings') },
    { key: 'logout', label: 'Logout', onClick: () => onNavigate('logout') },
  ];

  return (
    <div className="topbar">
      <button className="toggle-btn" onClick={onToggleSidebar}>
        <Icon name="menu" size={24} />
      </button>

      <div className="topbar-right">
        <div className="search-box">
          <Icon name="search" size={16} color="var(--color-text-muted)" />
          <input type="text" placeholder="Search..." style={{ width: '200px' }} />
        </div>

        <div className="dropdown">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-input-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {user?.name || 'Super Admin'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {user?.role || 'Super Admin'}
              </div>
            </div>
            <div
              className="avatar"
              style={{
                width: '36px',
                height: '36px',
              }}
            >
              {user?.name?.charAt(0) || 'S'}
            </div>
          </div>
          <div className="dropdown-menu" style={{ minWidth: '160px' }}>
            {dropdownItems.map((item) => (
              <button
                key={item.key}
                className="dropdown-item"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
