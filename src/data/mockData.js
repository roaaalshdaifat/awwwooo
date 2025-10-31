/**
 * Mock Data for Ops Heaven Application
 * بيانات تجريبية لتطبيق Ops Heaven
 * 
 * This file contains all the sample data used throughout the application:
 * - Users with different roles (employees, managers, admins)
 * - Meeting records and performance entries
 * - Performance metrics and goals
 * - Department statistics
 * - System alerts and notifications
 */

/**
 * mockUsers - قائمة المستخدمين التجريبية
 * Contains sample users with different roles and complete profile information
 * Roles: employee, manager, admin, super-admin
 */
export const mockUsers = [
  {
    id: 'jd',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee', // دور المستخدم: موظف
    department: 'Engineering',
    position: 'Software Engineer',
    manager: 'Sarah Johnson', // المدير المباشر
    startDate: '2023-01-15',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    employmentType: 'Full Time',
    salary: 75000, // الراتب السنوي
    currency: 'USD',
    lastRaise: '2024-01-15', // آخر زيادة راتب
    lastPromotion: '2023-06-15', // آخر ترقية
    qis: 88, // نقاط الأداء (Quality Index Score)
    status: 'active', // حالة الحساب: نشط/غير نشط
    professionalNotes: 'Experienced software engineer with expertise in React and Node.js. Strong team player and mentor.',
    avatar: 'JD' // الأحرف الأولى للاسم
  },
  {
    id: 'sj',
    name: 'Sarah Johnson', 
    email: 'sarah.johnson@company.com',
    role: 'manager', // دور المدير
    department: 'Engineering',
    position: 'Engineering Manager',
    directReports: 8, // عدد التقارير المباشرة
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    qis: 92,
    status: 'active',
    avatar: 'SJ'
  },
  {
    id: 'mw',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    role: 'super-admin', // دور الإدارة العليا
    department: 'IT',
    position: 'System Administrator',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    qis: 95,
    status: 'active',
    avatar: 'MW'
  },
  {
    id: 'aj',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Frontend Developer',
    manager: 'Sarah Johnson',
    qis: 85,
    status: 'active',
    avatar: 'AJ'
  },
  {
    id: 'bs',
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Backend Developer',
    manager: 'Sarah Johnson',
    qis: 72, // أداء يحتاج دعم
    status: 'inactive', // حساب غير نشط
    avatar: 'BS'
  },
  {
    id: 'cw',
    name: 'Carol Williams',
    email: 'carol.williams@company.com',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    qis: 91,
    status: 'active',
    avatar: 'CW'
  }
];

/**
 * mockMeetings - بيانات الاجتماعات التجريبية
 * Contains meeting records with performance entries
 * Meeting types: 10-10-10 reviews, performance meetings, etc.
 */
export const mockMeetings = [
  {
    id: '1',
    title: '10-10-10 Meeting - 7/15/2024', // اجتماع 10-10-10 (10 إنجازات، 10 تحديات، 10 أهداف)
    date: '2024-07-15',
    attendees: ['John Doe', 'Sarah Johnson'], // الحضور
    status: 'completed', // حالة الاجتماع: مكتمل/قادم
    entries: [ // إدخالات الأداء
      {
        id: '1',
        type: 'achievement', // نوع الإدخال: إنجاز
        content: 'Successfully launched the new user dashboard with 15% improvement in user engagement',
        visibility: 'shared' // الرؤية: مشارك مع المدير/خاص
      },
      {
        id: '2',
        type: 'achievement',
        content: 'Mentored two junior developers, helping them complete their onboarding projects',
        visibility: 'shared'
      },
      {
        id: '3',
        type: 'challenge', // نوع الإدخال: تحدي
        content: 'Faced some performance issues with the database queries that took longer to resolve than expected',
        visibility: 'shared'
      },
      {
        id: '4',
        type: 'goal', // نوع الإدخال: هدف
        content: 'Complete advanced React patterns course by end of Q3',
        visibility: 'shared'
      },
      {
        id: '5',
        type: 'goal',
        content: 'Lead the migration of legacy components to TypeScript',
        visibility: 'shared'
      },
      {
        id: '6',
        type: 'feedback', // نوع الإدخال: تغذية راجعة
        content: 'Manager noted excellent communication during cross-team collaboration',
        visibility: 'manager-only' // رؤية المدير فقط
      }
    ]
  },
  {
    id: '2',
    title: '10-10-10 Meeting - 10/15/2024', // اجتماع قادم
    date: '2024-10-15',
    attendees: ['John Doe', 'Sarah Johnson'],
    status: 'upcoming', // اجتماع قادم
    entries: [] // لا توجد إدخالات بعد
  }
];

/**
 * mockPerformanceData - بيانات الأداء التاريخية
 * Historical performance data for charts and trends
 * Used in dashboard charts and performance tracking
 */
export const mockPerformanceData = [
  { month: 'Jan', score: 82 }, // نقاط الأداء الشهرية
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 84 },
  { month: 'Apr', score: 87 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 88 }
];

/**
 * mockGoals - أهداف الموظفين التجريبية
 * Employee goals with progress tracking
 * Status: completed, in-progress, not-started
 */
export const mockGoals = [
  {
    id: '1',
    title: 'Complete Project Alpha',
    progress: 90, // نسبة الإنجاز (%)
    status: 'in-progress' // حالة الهدف
  },
  {
    id: '2',
    title: 'Learn React Advanced Patterns',
    progress: 75,
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Mentor Junior Developer',
    progress: 100,
    status: 'completed' // هدف مكتمل
  },
  {
    id: '4',
    title: 'Attend 2 Tech Conferences',
    progress: 50,
    status: 'in-progress'
  }
];

/**
 * mockDepartments - إحصائيات الأقسام
 * Department performance statistics and employee counts
 * Used in admin dashboard for company-wide insights
 */
export const mockDepartments = [
  { name: 'Engineering', employees: 89, score: 85.2, change: 2.3, color: '#3b82f6' }, // هندسة البرمجيات
  { name: 'Sales', employees: 45, score: 78.9, change: 1.8, color: '#10b981' }, // المبيعات
  { name: 'Marketing', employees: 32, score: 81.4, change: -0.5, color: '#f59e0b' }, // التسويق
  { name: 'Design', employees: 24, score: 88.1, change: 4.2, color: '#ef4444' }, // التصميم
  { name: 'HR', employees: 12, score: 79.8, change: 0.9, color: '#8b5cf6' }, // الموارد البشرية
  { name: 'Finance', employees: 18, score: 76.5, change: -1.2, color: '#06b6d4' }, // المالية
  { name: 'Operations', employees: 27, score: 83.7, change: 2.1, color: '#f97316' } // العمليات
];

/**
 * mockTeamPerformance - أداء الفريق الفصلي
 * Quarterly team performance data for trend analysis
 * Used in manager dashboard for team insights
 */
export const mockTeamPerformance = [
  { quarter: 'Q1 2024', score: 75 }, // الربع الأول
  { quarter: 'Q2 2024', score: 79 }, // الربع الثاني
  { quarter: 'Q3 2024', score: 82 }, // الربع الثالث
  { quarter: 'Q4 2024', score: 85 }  // الربع الرابع
];

/**
 * mockAlerts - تنبيهات النظام
 * System alerts and notifications for admin dashboard
 * Priority levels: high, medium, low
 */
export const mockAlerts = [
  {
    id: '1',
    message: 'Bob Smith (Engineering) requires attention - QIS dropped to 72', // تنبيه عالي الأولوية
    time: '2 hours ago',
    priority: 'high' // أولوية عالية
  },
  {
    id: '2',
    message: 'Scheduled maintenance completed successfully', // تنبيه منخفض الأولوية
    time: '4 hours ago',
    priority: 'low' // أولوية منخفضة
  },
  {
    id: '3',
    message: '3 new employees added to the system', // تنبيه متوسط الأولوية
    time: '6 hours ago',
    priority: 'medium' // أولوية متوسطة
  },
  {
    id: '4',
    message: 'Failed login attempts detected from unusual location', // تنبيه أمني
    time: '8 hours ago',
    priority: 'high'
  }
];