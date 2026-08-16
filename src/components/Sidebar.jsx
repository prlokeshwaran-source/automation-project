import React from 'react';
import Icon from './ui/Icon';

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    section: 'Main',
  },
  {
    id: 'admin',
    label: 'Admin Management',
    icon: 'admin',
    section: 'Main',
  },
  {
    id: 'organization',
    label: 'Organizations',
    icon: 'organization',
    section: 'Main',
  },
  {
    id: 'fb-config',
    label: 'Facebook Configuration',
    icon: 'facebook',
    section: 'Main',
  },
  {
    id: 'fb-pages',
    label: 'Facebook Pages',
    icon: 'pages',
    section: 'Main',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: 'campaign',
    section: 'Main',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'automation',
    section: 'Main',
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'analytics',
    section: 'Main',
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: 'roles',
    section: 'Administration',
  },
  {
    id: 'documents',
    label: 'Documents & Verification',
    icon: 'documents',
    section: 'Administration',
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: 'audit',
    section: 'Administration',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    section: 'Settings',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'profile',
    section: 'Settings',
  },
];

const Sidebar = ({ activeItem, onNavigate, collapsed = false }) => {
  const sections = {};
  sidebarItems.forEach((item) => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon"><Icon name="business" size={24} /></span>
          <span>Super Admin</span>
        </div>
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
        <div style={{ padding: '12px 24px', fontSize: '12px', color: 'var(--color-sidebar-text)', opacity: 0.6 }}>
          Super Admin Panel v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
