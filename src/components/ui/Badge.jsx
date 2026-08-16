import React from 'react';
import Icon from './Icon';

const Badge = ({ children, variant = 'secondary', className = '', ...rest }) => {
  const classes = ['badge', `badge-${variant}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
