import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'admin@company.com',
    phone: '0712345678',
    location: 'San Francisco, CA',
    bio: 'Experienced system administrator with 10+ years in enterprise software management and security.'
  });

  const [errors, setErrors] = useState({});

  // تحديث البيانات والتحقق من الصحة أثناء الكتابة
  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // تحقق من الصحة عند حفظ النموذج
  const validateForm = () => {
    const newErrors = {};
    
    // الأسماء يجب أن تكون بالإنجليزي فقط
    const nameRegex = /^[A-Za-z]+$/;
    if (!formData.firstName.trim()) newErrors.firstName = '⚠️ First name is required';
    else if (!nameRegex.test(formData.firstName)) newErrors.firstName = '⚠️ First name must be English letters only';

    if (!formData.lastName.trim()) newErrors.lastName = '⚠️ Last name is required';
    else if (!nameRegex.test(formData.lastName)) newErrors.lastName = '⚠️ Last name must be English letters only';

    // الإيميل يجب أن يحتوي .com
    if (!formData.email.trim()) newErrors.email = '⚠️ Email is required';
    else if (!/.+@.+\.com$/.test(formData.email)) newErrors.email = '⚠️ Email must include .com';

    // رقم الهاتف يجب أن يبدأ بـ 07 ويكون 10 أرقام
    if (!/^07\d{8}$/.test(formData.phone)) newErrors.phone = '⚠️ Phone must start with 07 and be 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsEditing(false);
      alert('✅ Profile saved successfully!');
    }
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Profile Settings</h1>
        { !isEditing && <button className="btn btn-primary" onClick={handleEdit}>✏️ Edit Profile</button> }
      </div>

      <form onSubmit={handleSubmit} className="personal-form">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} disabled={!isEditing} onChange={handleChange} className={`form-input ${errors.firstName ? 'error' : ''}`} />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} disabled={!isEditing} onChange={handleChange} className={`form-input ${errors.lastName ? 'error' : ''}`} />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} disabled={!isEditing} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} disabled={!isEditing} onChange={handleChange} className={`form-input ${errors.phone ? 'error' : ''}`} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} disabled={!isEditing} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={formData.bio} disabled={!isEditing} onChange={handleChange} className="form-textarea" rows={4} />
        </div>

        {isEditing && <button type="submit" className="btn btn-primary">Save</button>}
      </form>
    </div>
  );
};

export default SettingsPage;
