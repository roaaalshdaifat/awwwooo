import React, { useState } from 'react';
import './LoginPage.css';

const demoAccounts = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', user_id: 1 },
  { email: 'manager@example.com', password: 'manager123', role: 'manager', user_id: 2 },
  { email: 'user@example.com', password: 'user123', role: 'user', user_id: 3 },
  // أضف أو عدّل الحسابات التجريبية كما تريد
];

const createFakeToken = (email) => {
  // توليد توكن وهمي بسيط (للاختبار فقط)
  return btoa(`${email}:${Date.now()}`);
};

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const found = demoAccounts.find(
      (a) => a.email === formData.email && a.password === formData.password
    );

    if (!found) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة ❌');
      return;
    }

    const accessToken = createFakeToken(found.email);
    const { role, user_id } = found;

    // تخزين محلي (مناسب للاختبار فقط)
    localStorage.setItem('token', accessToken);
    localStorage.setItem('role', role);
    localStorage.setItem('user_id', user_id);

    // إرسال البيانات للأب App
    if (typeof onLogin === 'function') {
      onLogin({ token: accessToken, role, user_id });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isDisabled = formData.email === '' || formData.password === '';

  return (
    <div className="login-page fade-in">
      <div className="login-container slide-up">
        <div className="login-header">
          <div className="login-logo">👤</div>
          <h1 className="login-title">Employee Performance Tracker</h1>
          <p className="login-subtitle">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            type="submit"
            className={`btn btn-primary login-btn ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}
          >
            Sign In
          </button>
        </form>

        <div className="demo-note" style={{ marginTop: '12px', fontSize: '0.9rem' }}>
          <strong>ملاحظة:</strong> هذا الدخول محلي (محاكاة). جرب:
          <ul style={{ margin: '6px 0 0 18px' }}>
            <li>admin@example.com / admin123</li>
            <li>manager@example.com / manager123</li>
            <li>user@example.com / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
