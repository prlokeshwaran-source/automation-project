import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AdminManagement from './screens/AdminManagement';
import OrganizationManagement from './screens/OrganizationManagement';
import FacebookConfiguration from './screens/FacebookConfiguration';
import FacebookPages from './screens/FacebookPages';
import CampaignManagement from './screens/CampaignManagement';
import AutomationManagement from './screens/AutomationManagement';
import AnalyticsReports from './screens/AnalyticsReports';
import RolesPermissions from './screens/RolesPermissions';
import DocumentsVerification from './screens/DocumentsVerification';
import AuditLogs from './screens/AuditLogs';
import SystemSettings from './screens/SystemSettings';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';

const screenComponents = {
  dashboard: Dashboard,
  admin: AdminManagement,
  organization: OrganizationManagement,
  'fb-config': FacebookConfiguration,
  'fb-pages': FacebookPages,
  campaigns: CampaignManagement,
  automation: AutomationManagement,
  analytics: AnalyticsReports,
  roles: RolesPermissions,
  documents: DocumentsVerification,
  audit: AuditLogs,
  settings: SystemSettings,
  profile: Profile,
  notifications: Notifications,
};

const screenMeta = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Live overview of admins, organizations, campaigns, and engagement.',
  },
  admin: {
    title: 'Admin Management',
    subtitle: 'Create, review, and activate admin accounts.',
  },
  organization: {
    title: 'Organizations',
    subtitle: 'Manage organizations, business details, and assigned admins.',
  },
  'fb-config': {
    title: 'Facebook Configuration',
    subtitle: 'Secure API credentials and integration settings.',
  },
  'fb-pages': {
    title: 'Facebook Pages',
    subtitle: 'Track connected pages, tokens, and sync status.',
  },
  campaigns: {
    title: 'Campaigns',
    subtitle: 'Launch, pause, and monitor campaign performance.',
  },
  automation: {
    title: 'Automation',
    subtitle: 'Build trigger-based workflows that save time.',
  },
  analytics: {
    title: 'Analytics & Reports',
    subtitle: 'Review reach, impressions, leads, and exports.',
  },
  roles: {
    title: 'Roles & Permissions',
    subtitle: 'Define access across modules and actions.',
  },
  documents: {
    title: 'Documents & Verification',
    subtitle: 'Approve and review organization documents.',
  },
  audit: {
    title: 'Audit Logs',
    subtitle: 'Inspect user actions and system events.',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'See unread tasks, alerts, and system updates.',
  },
  settings: {
    title: 'System Settings',
    subtitle: 'Tune the platform, security, and notifications.',
  },
  profile: {
    title: 'Profile',
    subtitle: 'Update your account details and password.',
  },
};

const navToScreenMap = {
  dashboard: 'dashboard',
  admin: 'admin',
  'Admin Management': 'admin',
  organizations: 'organization',
  'Facebook Configuration': 'fb-config',
  'Facebook Pages': 'fb-pages',
  campaigns: 'campaigns',
  automation: 'automation',
  analytics: 'analytics',
  'Analytics & Reports': 'analytics',
  roles: 'roles',
  'Roles & Permissions': 'roles',
  documents: 'documents',
  'Documents & Verification': 'documents',
  audit: 'audit',
  'Audit Logs': 'audit',
  notifications: 'notifications',
  settings: 'settings',
  'System Settings': 'settings',
  profile: 'profile',
  'Profile': 'profile',
  logout: 'logout',
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('isAuthenticated');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (credentials) => {
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen('dashboard');
    localStorage.removeItem('isAuthenticated');
  };

  const handleNavigate = (screenId) => {
    const screen = navToScreenMap[screenId] || screenId;
    if (screen === 'logout') {
      if (window.confirm('Are you sure you want to logout?')) {
        handleLogout();
      }
    } else {
      setActiveScreen(screen);
    }
    setSidebarOpen(false);
  };

  const currentUser = {
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Super Admin',
  };

  const activeMeta = screenMeta[activeScreen] || screenMeta.dashboard;

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const ScreenComponent = screenComponents[activeScreen] || Dashboard;

  return (
    <div className="app-container">
      <Sidebar
        activeItem={activeScreen}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        user={currentUser}
      />
      <button
        type="button"
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close navigation"
      />
      <div className="main-content">
        <Topbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={currentUser}
          onNavigate={handleNavigate}
          screenMeta={activeMeta}
        />
        <div className="content-wrapper">
          <ScreenComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
