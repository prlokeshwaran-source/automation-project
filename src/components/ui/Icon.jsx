import React from 'react';

const iconMap = {
  dashboard: '📊',
  admin: '👤',
  organization: '🏢',
  facebook: '📘',
  pages: '📄',
  campaign: '🎯',
  automation: '⚙️',
  analytics: '📈',
  reports: '📊',
  roles: '🛡️',
  documents: '📎',
  audit: '📝',
  notifications: '🔔',
  settings: '⚙️',
  profile: '👤',
  logout: '↪️',
  search: '🔍',
  user: '👤',
  email: '✉️',
  phone: '📞',
  password: '🔒',
  save: '💾',
  cancel: '✖',
  edit: '✎',
  view: '👁',
  delete: '🗑',
  activate: '✅',
  pause: '⏸',
  play: '▶',
  download: '⬇',
  upload: '⬆',
  close: '✖',
  check: '✓',
  warning: '⚠',
  info: 'ℹ',
  success: '✓',
  error: '✖',
  calendar: '📅',
  clock: '🕐',
  globe: '🌐',
  business: '🏢',
  type: '🏷',
  assign: '📎',
  approve: '✅',
  reject: '❌',
  request: '↺',
  export: '📤',
  import: '📥',
  filter: '🎚',
  sort: '⇅',
  plus: '+',
  minus: '−',
  chevronLeft: '←',
  chevronRight: '→',
  dot: '•',
  star: '★',
  file: '📄',
  image: '🖼',
  link: '🔗',
  test: '🧪',
  connect: '🔌',
  disconnect: '🔌',
  copy: '📋',
  send: '→',
  refresh: '↻',
  menu: '≡',
};

const Icon = ({ name, size = 18, color = 'inherit', className = '' }) => {
  const iconChar = iconMap[name] || iconMap.dot;
  return (
    <span
      className={`icon icon-${name} ${className}`}
      style={{
        fontSize: size,
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {iconChar}
    </span>
  );
};

export default Icon;
