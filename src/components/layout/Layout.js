/**
 * Layout.js - التخطيط الأساسي للتطبيق
 * Main Application Layout Component
 * 
 * هذا المكون يحتوي على:
 * - هيكل الصفحة الأساسي (Basic Page Structure)
 * - دمج Header و Sidebar (Header and Sidebar Integration)  
 * - منطقة المحتوى الرئيسي (Main Content Area)
 * - نظام شبكة متجاوب (Responsive Grid System)
 * 
 * البنية:
 * ┌─────────────────────────────────────┐
 * │              Header                 │
 * ├──────────┬──────────────────────────┤
 * │          │                          │
 * │ Sidebar  │    Main Content          │
 * │          │                          │
 * │          │                          │
 * └──────────┴──────────────────────────┘
 * 
 * الوظائف:
 * 1. توفير بنية ثابتة لجميع الصفحات
 * 2. إدارة التخطيط المتجاوب
 * 3. تمرير بيانات المستخدم للمكونات الفرعية
 */

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * Layout Component - المكون الرئيسي للتخطيط
 * @param {React.ReactNode} children - المكونات الفرعية (صفحات التطبيق)
 * @param {Object} user - بيانات المستخدم الحالي
 */
const Layout = ({ children, user }) => {
  return (
    <div className="app">
      {/* 
        الشريط الجانبي - Sidebar Component
        يحتوي على قائمة التنقل الرئيسية
        يأخذ دور المستخدم لعرض القوائم المناسبة
      */}
      <Sidebar userRole={user?.role} />
      
      {/* 
        منطقة المحتوى الرئيسي - Main content area
        تحتوي على Header والمحتوى المتغير
      */}
      <div className="main-content">
        {/* 
          الشريط العلوي - Header Component
          يحتوي على الشعار، البحث، الإشعارات، ومعلومات المستخدم
          يظهر في جميع الصفحات
        */}
        <Header user={user} />
        
        {/* 
          منطقة المحتوى المتغير - Dynamic content area
          هنا يتم عرض محتوى الصفحات المختلفة
          (Dashboard, Profile, Meetings, etc.)
        */}
        <main className="content">
          {children} {/* المكونات الفرعية التي يتم تمريرها من App.js */}
        </main>
      </div>
    </div>
  );
};

export default Layout;