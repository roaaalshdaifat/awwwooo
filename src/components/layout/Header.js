/**
 * Header.js - شريط العلوي للتطبيق
 * Application Header Component
 * 
 * هذا المكون يحتوي على:
 * - شعار التطبيق (Ops Heaven Logo)
 * - شريط البحث العام (Global Search Bar)
 * - إشعارات المستخدم (User Notifications)
 * - قائمة المستخدم (User Profile Menu)
 * 
 * الوظائف المتاحة:
 * 1. البحث في الموظفين والاجتماعات والتقارير
 * 2. عرض الإشعارات مع عداد
 * 3. عرض معلومات المستخدم الحالي
 * 4. التنقل السريع للوظائف الأساسية
 */

import React from 'react';
import './Header.css';

/**
 * Header Component - المكون الرئيسي للشريط العلوي
 * @param {Object} user - بيانات المستخدم الحالي
 * @param {Function} onLogout - دالة تسجيل الخروج
 */
const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      {/* 
        الجانب الأيسر من الشريط - Left side of header
        يحتوي على الشعار وشريط البحث
      */}
      <div className="header-left">
        {/* 
          شعار التطبيق - Application Logo
          يعرض اسم وأيقونة Ops Heaven
        */}
        <div className="logo">
          <div className="logo-icon">📊</div> {/* أيقونة الرسم البياني - Chart icon */}
          <span className="logo-text">Ops Heaven</span> {/* اسم التطبيق */}
        </div>
        
        {/* 
          حاوي شريط البحث - Search container
          يسمح بالبحث عبر النظام في الموظفين والاجتماعات والتقارير
        */}
       
      </div>
      
      {/* 
        الجانب الأيمن من الشريط - Right side of header
        يحتوي على الإشعارات ومعلومات المستخدم
      */}
      <div className="header-right">
        {/* 
          قسم الإشعارات - Notifications section
          يعرض الإشعارات مع عداد للإشعارات الجديدة
        */}
     
        
        {/* 
          زر تسجيل الدخول - Login button
          يقوم بتسجيل الخروج والعودة لصفحة تسجيل الدخول
        */}
        <button 
          className="login-btn"
          onClick={() => {
            if (onLogout) {
              onLogout(); // تسجيل الخروج والعودة لصفحة تسجيل الدخول
            }
          }}
          title="تسجيل خروج / العودة لصفحة تسجيل الدخول"
        >
          LOGOUT
        </button>
        
        {/* 
          قائمة المستخدم - User menu section
          تعرض صورة المستخدم واسمه ودوره
        */}
        <div className="user-menu">
          {/* 
            صورة رمزية للمستخدم - User avatar
            تعرض الحرف الأول من اسم المستخدم
          */}
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'} {/* الحرف الأول أو U افتراضياً */}
          </div>
          
          {/* 
            معلومات المستخدم - User information
            تعرض الاسم والدور الوظيفي
          */}
          <div className="user-info">
            <div className="user-name">{user?.name || 'User'}</div> {/* اسم المستخدم */}
            <div className="user-role">{user?.role || 'Employee'}</div> {/* دور المستخدم */}
            {/* TODO: إضافة قائمة منسدلة للإعدادات وتسجيل الخروج */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;