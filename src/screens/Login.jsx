import React, { useState } from 'react';
import Icon from '../components/ui/Icon';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const result = await login(formData.email, formData.password, formData.rememberMe);

    if (result.success) {
      // Auth context handles state update
    } else {
      setErrors({ submit: result.error });
    }

    setIsSubmitting(false);
  };

  const handleForgot = () => {
    alert('Forgot password clicked. Please contact your system administrator.');
  };

  const featureItems = [
    {
      icon: 'shield',
      title: 'Secure Access',
      description: 'Role-aware entry with a clean login experience.',
    },
    {
      icon: 'activity',
      title: 'Live Operations',
      description: 'Track admin, campaign, and compliance activity.',
    },
    {
      icon: 'analytics',
      title: 'Performance Insights',
      description: 'See leads, reach, and engagement in one place.',
    },
  ];

  const metrics = [
    { value: '24/7', label: 'Monitoring' },
    { value: '12', label: 'Modules' },
    { value: '3.2K', label: 'Daily events' },
  ];

  return (
    <div className="login-page">
      <div className="auth-shell">
        <section className="auth-visual card">
          <div className="auth-visual-header">
            <span className="auth-eyebrow">Super Admin Suite</span>
            <h1>Command every module from one elegant workspace.</h1>
            <p>
              Manage admins, organizations, Facebook assets, campaigns, and audits without losing context.
            </p>
          </div>

          <div className="auth-feature-grid">
            {featureItems.map((item) => (
              <div className="auth-feature" key={item.title}>
                <span className="auth-feature-icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="auth-metrics">
            {metrics.map((metric) => (
              <div className="auth-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="auth-callout">
            <span className="auth-callout-label">Trusted control center</span>
            <p>One place for governance, growth, and reporting.</p>
          </div>
        </section>

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Icon name="business" size={28} />
            </div>
            <h2 className="login-title">Super Admin Login</h2>
            <p className="login-subtitle">Sign in to the control center</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-banner">
                <Icon name="error" size={16} />
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="form-group">
              <label className="required">Email / Username</label>
              <input
                type="text"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
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
                autoComplete="current-password"
                required
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group login-options">
              <label className="form-switch login-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember Me</span>
              </label>
              <button type="button" className="forgot-link" onClick={handleForgot}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block btn-login"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>

            <div className="login-footer">
              Need help? <a href="#support" onClick={(e) => e.preventDefault()}>Contact support</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;