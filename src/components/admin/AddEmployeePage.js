import React, { useState } from 'react';
import './AddEmployeePage.css';

/**
 * AddEmployeePage Component
 * صفحة إضافة موظف جديد - نموذج كامل مع جميع الحقول
 * Features:
 * - نموذج متعدد الخطوات
 * - المعلومات الأساسية والوظيفية
 * - المهارات وجهة الاتصال الطارئة
 * - التحقق من صحة البيانات
 */
const AddEmployeePage = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information - المعلومات الشخصية
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    
    // Job Information - معلومات الوظيفة
    department: '',
    position: '',
    startDate: '',
    annualSalary: '',
    
    // Contact Information - معلومات الاتصال
    phoneNumber: '',
    address: '',
    emergencyContact: '',
    
    // Additional Information - معلومات إضافية
    skills: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // تحديث بيانات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // إزالة الخطأ عند التعديل
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // إضافة مهارة جديدة
  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  // إزالة مهارة
  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Employee data:', formData);
      // هنا يتم إرسال البيانات للخادم
      alert('Employee added successfully!');
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '',
      department: '',
      position: '',
      startDate: '',
      annualSalary: '',
      phoneNumber: '',
      address: '',
      emergencyContact: '',
      skills: [],
      notes: ''
    });
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <div className="add-employee-page">
      {/* Page Header - عنوان الصفحة */}
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Add New Employee</h1>
          <p className="page-subtitle">Create a new employee account and profile</p>
        </div>
      </div>

      {/* Employee Form - نموذج الموظف */}
      <div className="employee-form-container">
        <form onSubmit={handleSubmit} className="employee-form">
          
          {/* Form Header - رأس النموذج */}
          <div className="form-header">
            <h2>Employee Information</h2>
            <p>Enter the new employee's details. They will receive an email invitation to set up their account.</p>
          </div>

          {/* Personal Information Section - قسم المعلومات الشخصية */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter work email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter employee ID (optional)"
                />
              </div>
            </div>
          </div>

          {/* Job Information Section - قسم معلومات الوظيفة */}
          <div className="form-section">
            <h3 className="section-title">Job Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`form-select ${errors.department ? 'error' : ''}`}
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`form-input ${errors.position ? 'error' : ''}`}
                  placeholder="Enter job title"
                />
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Annual Salary</label>
                <input
                  type="number"
                  name="annualSalary"
                  value={formData.annualSalary}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter annual salary"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section - قسم معلومات الاتصال */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter home address"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="form-input"
                placeholder="Name and phone number"
              />
            </div>
          </div>

          {/* Skills Section - قسم المهارات */}
          <div className="form-section">
            <h3 className="section-title">Skills</h3>
            <SkillsInput skills={formData.skills} onAddSkill={addSkill} onRemoveSkill={removeSkill} />
          </div>

          {/* Notes Section - قسم الملاحظات */}
          <div className="form-section">
            <h3 className="section-title">Notes</h3>
            <div className="form-group">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Additional notes about the employee"
                rows={4}
              />
            </div>
          </div>

          {/* Form Actions - إجراءات النموذج */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Reset Form
            </button>
            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * SkillsInput Component
 * مكون إدخال المهارات
 */
const SkillsInput = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="skills-input">
      <div className="skills-add">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-input"
          placeholder="Add a skill"
        />
        <button type="button" onClick={handleAddSkill} className="btn btn-primary skill-add-btn">
          ➕
        </button>
      </div>
      
      {skills.length > 0 && (
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="skill-remove"
              >
                ✖️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddEmployeePage;