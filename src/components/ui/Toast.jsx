import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">
        <Icon name={type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'} size={18} />
      </span>
      <div className="toast-content">
        <div className="toast-title">{type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notice'}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button
        className="toast-close"
        onClick={() => {
          setVisible(false);
          if (onClose) setTimeout(onClose, 300);
        }}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  React.useImperativeHandle(ToastHandleRef, () => ({ addToast }));

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export const ToastHandleRef = React.createRef();
export const useToast = () => {
  if (ToastHandleRef.current) {
    return { addToast: ToastHandleRef.current.addToast };
  }
  return { addToast: () => {} };
};

export default Toast;
