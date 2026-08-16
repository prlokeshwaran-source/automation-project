import React, { useState } from 'react';

const Dropdown = ({ trigger, items = [], direction = 'right' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ display: 'inline-block' }}
    >
      {trigger}
      <div
        className="dropdown-menu"
        style={{
          right: direction === 'right' ? 0 : 'auto',
          left: direction === 'left' ? 0 : 'auto',
          minWidth: 160,
        }}
      >
        {items.map((item) => (
          <button
            key={item.key}
            className="dropdown-item"
            onClick={item.onClick}
            style={{ color: item.color || 'inherit' }}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
