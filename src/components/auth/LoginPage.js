import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://ohtmeetingproject.onrender.com/login',
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { accessToken, role, user_id } = response.data;

      // ✅ تخزين التوكن في localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      // ✅ إرسال بيانات المستخدم للأب App
      onLogin({ token: accessToken, role, user_id });

    } catch (err) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة ❌');
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
      </div>
    </div>
  );
};

export default LoginPage;
