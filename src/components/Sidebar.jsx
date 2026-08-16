import React from 'react';
import Icon from './ui/Icon';

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    section: 'Overview',
  },
  {
    id: 'admin',
    label: 'Admin Management',
    icon: 'admin',
    section: 'Operations',
  },
  {
    id: 'organization',
    label: 'Organizations',
    icon: 'organization',
    section: 'Operations',
  },
  {
    id: 'fb-config',
    label: 'Facebook Configuration',
    icon: 'facebook',
    section: 'Operations',
  },
  {
    id: 'fb-pages',
    label: 'Facebook Pages',
    icon: 'pages',
    section: 'Operations',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: 'campaign',
    section: 'Operations',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'automation',
    section: 'Operations',
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'analytics',
    section: 'Operations',
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: 'roles',
    section: 'Governance',
  },
  {
    id: 'documents',
    label: 'Documents & Verification',
    icon: 'documents',
    section: 'Governance',
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: 'audit',
    section: 'Governance',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'notifications',
    section: 'Account',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    section: 'Account',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'profile',
    section: 'Account',
  },
];

const Sidebar = ({ activeItem, onNavigate, open = false, user }) => {
  const sections = {};
  sidebarItems.forEach((item) => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });

  return (
    <aside className={`sidebar ${open ? 'active' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">
            <Icon name="business" size={20} />
          </span>
          <div className="sidebar-brand-copy">
            <span className="sidebar-brand-eyebrow">Enterprise Suite</span>
            <span className="sidebar-brand-title">Super Admin</span>
          </div>
        </div>
        <span className="sidebar-version">Live</span>
      </div>

      <div className="sidebar-highlight">
        <span className="sidebar-highlight-label">Workspace health</span>
        <strong className="sidebar-highlight-value">98% connected</strong>
        <span className="sidebar-highlight-note">3 approvals pending today</span>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(sections).map(([section, items]) => (
          <div className="nav-group" key={section}>
            <div className="group-label">{section}</div>
            {items.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon"><Icon name={item.icon} size={16} /></span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="nav-group">
          <button
            className="nav-link"
            onClick={() => onNavigate('logout')}
          >
            <span className="nav-icon"><Icon name="logout" size={16} /></span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="avatar sidebar-avatar">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="sidebar-user-copy">
            <span className="sidebar-user-name">{user?.name || 'Super Admin'}</span>
            <span className="sidebar-user-role">{user?.role || 'Super Admin'}</span>
          </div>
        </div>
        <div className="sidebar-footer-note">Super Admin Panel v2.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
