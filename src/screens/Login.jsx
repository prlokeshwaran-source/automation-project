import React, { useState } from 'react';
import Icon from '../components/ui/Icon';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onLogin({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });
  };

  const handleForgot = () => {
    alert('Forgot password clicked. Please contact your system administrator.');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Icon name="business" size={32} />
          </div>
          <h2 className="login-title">Super Admin Login</h2>
          <p className="login-subtitle">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="required">Email / Username</label>
            <input
              type="text"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text" style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="required">Password</label>
            <input
              type="password"
              name="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-text" style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label className="form-switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Remember Me</span>
            </label>
            <button
              type="button"
              onClick={handleForgot}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                fontSize: '13px',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            style={{ marginTop: '8px' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
