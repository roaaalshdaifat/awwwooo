/**
 * Sidebar.js - الشريط الجانبي للتنقل
 * Navigation Sidebar Component
 * 
 * هذا المكون يحتوي على:
 * - قائمة التنقل الرئيسية (Main Navigation Menu)
 * - عناصر مخصصة حسب دور المستخدم (Role-based Menu Items)
 * - تمييز الصفحة النشطة (Active Page Highlighting)
 * - إيقونات وتسميات الصفحات (Page Icons and Labels)
 * 
 * الأدوار المدعومة:
 * 1. employee: موظف عادي - الصفحات الأساسية
 * 2. manager: مدير - صفحات إضافية لإدارة الفريق
 * 3. admin/super-admin: إدارة - جميع الصفحات والإعدادات
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar Component - المكون الرئيسي للشريط الجانبي
 * @param {string} userRole - دور المستخدم الحالي (employee, manager, admin, super-admin)
 */
const Sidebar = ({ userRole = 'employee' }) => {
  const navigate = useNavigate(); // للتنقل بين الصفحات - For navigation
  const location = useLocation(); // للحصول على الصفحة الحالية - For current page

  /**
   * getMenuItems - وظيفة لإنشاء قائمة التنقل حسب الدور
   * Function to generate navigation menu based on user role
   * @returns {Array} قائمة عناصر القائمة مع المسارات والأيقونات
   */
  const getMenuItems = () => {
    /**
     * baseItems - العناصر الأساسية المتاحة لجميع المستخدمين
     * Base menu items available to all users
     */
    const baseItems = [
      { 
        path: '/dashboard', 
        icon: '📊', 
        label: 'Dashboard' // لوحة المعلومات - عرض الإحصائيات والمؤشرات
      },
      { 
        path: '/profile', 
        icon: '👤', 
        label: 'Profile' // الملف الشخصي - معلومات وإعدادات المستخدم
      },
      { 
        path: '/meetings', 
        icon: '📅', 
        label: 'Meetings' // الاجتماعات - 10-10-10 meetings وإدخالات الأداء
      }
    ];

    /**
     * إذا كان المستخدم مدير - Manager role menu items
     * يحصل على العناصر الأساسية + إدارة الفريق
     */
    if (userRole === 'manager') {
      return [
        ...baseItems,
        { 
          path: '/team', 
          icon: '👥', 
          label: 'Team' // إدارة الفريق - عرض وإدارة أعضاء الفريق
        },
        { 
          path: '/add-employee', 
          icon: '➕', 
          label: 'Add Employee' // إضافة موظف - نموذج إضافة موظف جديد
        }
      ];
    }

    /**
     * إذا كان المستخدم إدارة عليا - Admin/Super-admin role menu items
     * يحصل على جميع العناصر + إدارة النظام
     */
    if (userRole === 'admin' || userRole === 'super-admin') {
      return [
        ...baseItems,
        { 
          path: '/team', 
          icon: '👥', 
          label: 'Team' // إدارة الفريق - إدارة شاملة للفرق
        },
        { 
          path: '/user-management', 
          icon: '⚙️', 
          label: 'User Management' // إدارة المستخدمين - عرض وتعديل جميع المستخدمين
        },
        { 
          path: '/add-employee', 
          icon: '➕', 
          label: 'Add Employee' // إضافة موظف - إضافة موظفين جدد
        },
        { 
          path: '/settings', 
          icon: '🔧', 
          label: 'Settings' // الإعدادات - إعدادات النظام والحساب
        }
      ];
    }

    // إرجاع العناصر الأساسية للموظفين العاديين
    return baseItems;
  };

  // الحصول على قائمة العناصر المناسبة للمستخدم الحالي
  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      {/* 
        قائمة التنقل الرئيسية - Main navigation menu
        تحتوي على جميع روابط الصفحات المتاحة للمستخدم
      */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.path} // مفتاح فريد لكل عنصر
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`} // تمييز الصفحة النشطة
            onClick={() => navigate(item.path)} // التنقل عند النقر
          >
            {/* أيقونة الصفحة - Page icon */}
            <span className="nav-icon">{item.icon}</span>
            
            {/* تسمية الصفحة - Page label */}
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;