import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { AuthProvider, useAuth } from './context/AuthContext';
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
    icon: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Live overview of admins, organizations, campaigns, and engagement.',
  },
  admin: {
    icon: 'admin',
    title: 'Admin Management',
    subtitle: 'Create, review, and activate admin accounts.',
  },
  organization: {
    icon: 'organization',
    title: 'Organizations',
    subtitle: 'Manage organizations, business details, and assigned admins.',
  },
  'fb-config': {
    icon: 'facebook',
    title: 'Facebook Configuration',
    subtitle: 'Secure API credentials and integration settings.',
  },
  'fb-pages': {
    icon: 'pages',
    title: 'Facebook Pages',
    subtitle: 'Track connected pages, tokens, and sync status.',
  },
  campaigns: {
    icon: 'campaign',
    title: 'Campaigns',
    subtitle: 'Launch, pause, and monitor campaign performance.',
  },
  automation: {
    icon: 'automation',
    title: 'Automation',
    subtitle: 'Build trigger-based workflows that save time.',
  },
  analytics: {
    icon: 'analytics',
    title: 'Analytics & Reports',
    subtitle: 'Review reach, impressions, leads, and exports.',
  },
  roles: {
    icon: 'roles',
    title: 'Roles & Permissions',
    subtitle: 'Define access across modules and actions.',
  },
  documents: {
    icon: 'documents',
    title: 'Documents & Verification',
    subtitle: 'Approve and review organization documents.',
  },
  audit: {
    icon: 'audit',
    title: 'Audit Logs',
    subtitle: 'Inspect user actions and system events.',
  },
  notifications: {
    icon: 'notifications',
    title: 'Notifications',
    subtitle: 'See unread tasks, alerts, and system updates.',
  },
  settings: {
    icon: 'settings',
    title: 'System Settings',
    subtitle: 'Tune the platform, security, and notifications.',
  },
  profile: {
    icon: 'profile',
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

const AppContent = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setActiveScreen('dashboard');
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
    name: user ? `${user.firstName} ${user.lastName}` : 'User',
    email: user?.email || 'user@example.com',
    role: user?.role || 'user',
  };

  const activeMeta = screenMeta[activeScreen] || screenMeta.dashboard;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading CRM...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
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

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;