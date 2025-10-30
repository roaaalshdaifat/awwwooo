import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

/**
 * المكون الرئيسي للتطبيق - Main App Component
 * يدير حالة المصادقة والتوجيه العام للتطبيق
 */
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // فحص حالة تسجيل الدخول عند تحميل التطبيق
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // معالج تسجيل الدخول
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // معالج تسجيل الخروج
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  // شاشة التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!user ? (
          // صفحة تسجيل الدخول
          <LoginPage onLogin={handleLogin} />
        ) : (
          // التطبيق الرئيسي بعد تسجيل الدخول
          <Layout user={user}>
            <Routes>
              {/* الصفحة الرئيسية */}
              <Route 
                path="/" 
                element={<DashboardPage user={user} />} 
              />
              
              {/* صفحة الملف الشخصي */}
              <Route 
                path="/profile" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Page</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                } 
              />
              
              {/* صفحة الفريق */}
              <Route 
                path="/team" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                } 
              />
              
              {/* صفحة إضافة موظف */}
              <Route 
                path="/add-employee" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                } 
              />
              
              {/* صفحة الاجتماعات */}
              <Route 
                path="/meetings" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Meetings & Performance Notes</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                } 
              />
              
              {/* صفحة التقارير */}
              <Route 
                path="/reports" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                  </div>
                } 
              />
              
              {/* صفحة الإعدادات */}
              <Route 
                path="/settings" 
                element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                    <p className="text-gray-600 mt-2">Coming soon...</p>
                    <button 
                      onClick={handleLogout}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                } 
              />
              
              {/* توجيه أي مسار غير معروف للصفحة الرئيسية */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App;
