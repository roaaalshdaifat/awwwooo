/**
 * LoginPage.js - صفحة تسجيل الدخول
 * User Authentication Component
 * 
 * هذا المكون يحتوي على:
 * - نموذج تسجيل الدخول (Login Form)
 * - التحقق من الحسابات التجريبية (Demo Account Validation)
 * - واجهة مستخدم مبسطة وجذابة (Clean UI Design)
 * - معلومات الحسابات التجريبية (Demo Account Information)
 * 
 * الحسابات المتاحة:
 * 1. employee@company.com - موظف عادي
 * 2. manager@company.com - مدير فريق
 * 3. admin@company.com - إدارة عليا
 * 
 * الوظائف:
 * 1. التحقق من صحة البيانات المدخلة
 * 2. تحديد دور المستخدم وتوجيهه للواجهة المناسبة
 * 3. إدارة حالة النموذج
 */

import React, { useState } from 'react';
import './LoginPage.css';

/**
 * LoginPage Component - مكون صفحة تسجيل الدخول
 * @param {Function} onLogin - وظيفة يتم استدعاؤها عند نجاح تسجيل الدخول
 */
const LoginPage = ({ onLogin }) => {
  /**
   * formData - حالة بيانات النموذج
   * State for form input data
   */
  const [formData, setFormData] = useState({
    email: '', // البريد الإلكتروني
    password: '' // كلمة المرور
  });

  /**
   * handleSubmit - وظيفة معالجة إرسال النموذج
   * Function to handle form submission
   * @param {Event} e - حدث إرسال النموذج
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // منع إرسال النموذج الافتراضي
    
    /**
     * demoAccounts - قاعدة بيانات الحسابات التجريبية
     * Demo accounts database for testing different user roles
     * كل حساب يحتوي على: الدور، الاسم
     */
    const demoAccounts = {
      'employee@company.com': { 
        role: 'employee', 
        name: 'John Doe' // موظف عادي - وصول للوظائف الأساسية
      },
      'manager@company.com': { 
        role: 'manager', 
        name: 'Sarah Johnson' // مدير - وصول لإدارة الفريق
      },
      'admin@company.com': { 
        role: 'super-admin', 
        name: 'Mike Wilson' // إدارة عليا - وصول كامل للنظام
      }
    };

    // البحث عن المستخدم في قاعدة البيانات التجريبية
    const user = demoAccounts[formData.email];
    
    /**
     * إذا تم العثور على المستخدم، تسجيل الدخول
     * If user found, proceed with login
     */
    if (user) {
      onLogin({ 
        ...user, 
        email: formData.email // إضافة البريد الإلكتروني لبيانات المستخدم
      });
    }
    // TODO: إضافة رسالة خطأ في حالة عدم وجود المستخدم
  };

  /**
   * handleChange - وظيفة معالجة تغيير قيم الحقول
   * Function to handle input field changes
   * @param {Event} e - حدث تغيير قيمة الحقل
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // تحديث الحقل المقابل
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 
          رأس صفحة تسجيل الدخول - Login header section
          يحتوي على الشعار وعنوان التطبيق
        */}
        <div className="login-header">
          <div className="login-logo">👤</div> {/* أيقونة المستخدم */}
          <h1 className="login-title">Employee Performance Tracker</h1>
          <p className="login-subtitle">Sign in to your Performance Tracker account</p>
        </div>

        {/* 
          نموذج تسجيل الدخول - Login form
          يحتوي على حقول البريد الإلكتروني وكلمة المرور
        */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* حقل البريد الإلكتروني - Email field */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required // حقل مطلوب
            />
          </div>

          {/* حقل كلمة المرور - Password field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required // حقل مطلوب
            />
          </div>

          {/* زر تسجيل الدخول - Submit button */}
          <button type="submit" className="btn btn-primary login-btn">
            Sign In
          </button>

          {/* رابط نسيان كلمة المرور - Forgot password link */}
          <div className="forgot-password">
            <a href="#" className="forgot-link">Forgot your password?</a>
            {/* TODO: إضافة وظيفة استرداد كلمة المرور */}
          </div>
        </form>

        {/* 
          معلومات الحسابات التجريبية - Demo accounts information
          تعرض للمستخدمين الحسابات المتاحة للاختبار
        */}
        <div className="demo-accounts">
          <h3>Demo accounts:</h3> {/* عنوان الحسابات التجريبية */}
          
          {/* حساب الموظف - Employee account */}
          <div className="demo-item">Employee: employee@company.com</div>
          
          {/* حساب المدير - Manager account */}
          <div className="demo-item">Manager: manager@company.com</div>
          
          {/* حساب الإدارة - Admin account */}
          <div className="demo-item">Super Admin: admin@company.com</div>
          
          {/* كلمة المرور الموحدة - Universal password */}
          <div className="demo-item">Password: password123</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;