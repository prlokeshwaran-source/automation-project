import React from 'react';
import Icon from './Icon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-block' : '',
    icon && !children ? 'btn-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && iconPosition === 'left' && children && (
        <span className="btn-icon-left" style={{ marginRight: children ? 8 : 0 }}>
          <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      )}
      {icon && !children && (
        <span className="btn-icon-only">
          <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && children && (
        <span className="btn-icon-right" style={{ marginLeft: 8 }}>
          <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      )}
    </button>
  );
};

export default Button;
