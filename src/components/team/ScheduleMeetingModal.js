import React, { useState } from 'react';
import './ScheduleMeetingModal.css';

// ✅ بيانات جاهزة لمدراء وموظفين
const managersList = [
  { id: 1, name: "Ahmed Hasan" },
  { id: 2, name: "Rania Khaled" },
  { id: 3, name: "Omar Zaid" }
];

const employeesList = [
  { id: 101, name: "Sara Ali", managerId: 1 },
  { id: 102, name: "Heba Mahmoud", managerId: 1 },

  { id: 201, name: "Mohammad Samir", managerId: 2 },
  { id: 202, name: "Lama Tareq", managerId: 2 },

  { id: 301, name: "Yousef Ahmad", managerId: 3 },
  { id: 302, name: "Nour Fares", managerId: 3 },
];

const ScheduleMeetingModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    managerId: '',
    employeeId: '',
    title: '',
    date: '',
    time: ''
  });

  const filteredEmployees = employeesList.filter(
    (emp) => emp.managerId === Number(formData.managerId)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    // تحديث الموظفين بعد تغيير المدير
    if (name === "managerId") {
      setFormData({
        ...formData,
        managerId: value,
        employeeId: ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.managerId || !formData.employeeId) {
      alert("⚠️ لازم تختاري المدير والموظف قبل حفظ الاجتماع");
      return;
    }

    console.log("📌 Meeting Scheduled:", formData);
    alert("✅ تم جدولة الاجتماع بنجاح");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal schedule-meeting-modal">

        <div className="modal-header">
          <h2>📅 Schedule a Meeting</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">

          {/* اختيار المدير */}
          <div className="form-group">
            <label className="form-label">Select Manager *</label>
            <select 
              name="managerId" 
              value={formData.managerId}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Choose Manager</option>
              {managersList.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* يظهر الموظف فقط بعد اختيار المدير */}
          {formData.managerId && (
            <div className="form-group fade-in">
              <label className="form-label">Select Employee *</label>
              <select 
                name="employeeId" 
                value={formData.employeeId}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Choose Employee</option>

                {filteredEmployees.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* عنوان الاجتماع */}
          <div className="form-group">
            <label className="form-label">Meeting Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Monthly Performance Review"
              required
            />
          </div>

          {/* التاريخ والوقت */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input 
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time *</label>
              <input 
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Schedule Meeting
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ScheduleMeetingModal;
