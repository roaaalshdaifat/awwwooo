/**
 * App.js - المكون الجذر للتطبيق
 * Main Application Component for Ops Heaven
 * 
 * هذا الملف يحتوي على:
 * - إعداد المسارات الرئيسية (Routing) 
 * - إدارة حالة المصادقة (Authentication State)
 * - حماية المسارات حسب الأدوار (Role-based Route Protection)
 * - تخطيط الصفحات الأساسي (Basic Layout Structure)
 * 
 * الوظائف الأساسية:
 * 1. تسجيل الدخول والخروج
 * 2. توجيه المستخدمين حسب أدوارهم
 * 3. حماية الصفحات من الوصول غير المصرح
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// استيراد مكونات التخطيط الأساسية - Layout Components
import Layout from './components/layout/Layout';

// استيراد صفحة تسجيل الدخول - Authentication Component  
import LoginPage from './components/auth/LoginPage';

// استيراد مكونات لوحة المعلومات - Dashboard Components
import Dashboard from './components/dashboard/Dashboard';

// استيراد مكونات الموظفين - Employee Components
import ProfilePage from './components/employee/ProfilePage';
import MeetingsPage from './components/employee/MeetingsPage';

// استيراد مكونات إدارة الفرق - Team Management Components
import TeamManagement from './components/team/TeamManagement';

// استيراد مكونات المديرين - Manager Components
import ManagerProfile from './components/manager/ManagerProfile';

// استيراد مكونات الإدارة - Admin Components
import UserManagement from './components/admin/UserManagement';

function App() {
  /**
   * user - حالة المستخدم الحالي
   * Current user state - stores logged-in user information
   * null: لم يسجل دخول، object: مسجل دخول مع البيانات
   */
  const [user, setUser] = useState(null);

  /**
   * handleLogin - وظيفة تسجيل الدخول
   * Function to handle user login
   * @param {Object} userData - بيانات المستخدم من نموذج تسجيل الدخول
   * 
   * تقوم بـ:
   * 1. حفظ بيانات المستخدم في الحالة
   * 2. إعادة عرض التطبيق مع واجهة المستخدم المسجل
   */
  const handleLogin = (userData) => {
    setUser(userData);
  };

  /**
   * handleLogout - وظيفة تسجيل الخروج
   * Function to handle user logout
   * 
   * تقوم بـ:
   * 1. مسح بيانات المستخدم
   * 2. إعادة عرض صفحة تسجيل الدخول
   */
  const handleLogout = () => {
    setUser(null);
  };

  /**
   * شرطية عرض صفحة تسجيل الدخول
   * Conditional rendering for login page
   * إذا لم يكن هناك مستخدم مسجل، عرض صفحة تسجيل الدخول
   */
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  /**
   * عرض التطبيق الرئيسي مع المسارات المحمية
   * Main application render with protected routes
   */
  return (
    <Router>
      {/* 
        Layout - التخطيط الأساسي للتطبيق
        يحتوي على Header, Sidebar, وحاوي المحتوى الرئيسي
        يتم تمرير بيانات المستخدم لعرض القوائم المناسبة
      */}
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* 
            المسار الافتراضي - Default Route
            يعيد توجيه المستخدم إلى لوحة المعلومات
          */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* 
            لوحة المعلومات - Dashboard Route
            الصفحة الرئيسية تعرض إحصائيات الأداء حسب دور المستخدم
          */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          
          {/* 
            مسارات الموظفين - Employee Routes
            متاحة لجميع المستخدمين (موظفين، مديرين، إدارة)
          */}
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/meetings" element={<MeetingsPage user={user} />} />
          
          {/* 
            مسارات المديرين - Manager Routes
            متاحة للمديرين والإدارة فقط (manager, admin, super-admin)
            تتضمن إدارة الفرق
          */}
          {(user.role === 'manager' || user.role === 'admin' || user.role === 'super-admin') && (
            <>
              {/* إدارة الفرق - عرض وإدارة أعضاء الفريق */}
              <Route path="/team" element={<TeamManagement user={user} />} />
            </>
          )}
          
          {/* 
            مسارات الإدارة - Admin Routes
            متاحة للإدارة العليا فقط (admin, super-admin)
            تتضمن إدارة المستخدمين والإعدادات العامة
          */}
          {(user.role === 'admin' || user.role === 'super-admin') && (
            <>
              {/* إدارة المستخدمين - عرض وتعديل بيانات جميع المستخدمين */}
              <Route path="/user-management" element={<UserManagement user={user} />} />
            </>
          )}
          
          {/* 
            مسار احتياطي - Fallback Route
            أي مسار غير معرف يتم توجيهه للوحة المعلومات
          */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;