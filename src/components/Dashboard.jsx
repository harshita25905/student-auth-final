import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passForm, setPassForm] = useState({ oldPassword: '', newPassword: '' });
  const [courseForm, setCourseForm] = useState({ course: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/me');
      setStudent(res.data.student);
      setCourseForm({ course: res.data.student.course });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch profile', err);
      // If unauthorized, clear token and redirect
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMsg({ text, type });
    // Clear message after 3 seconds
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put('/update-password', passForm);
      showMessage('Password updated successfully!', 'success');
      setPassForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to update password', 'error');
    }
  };

  const handleCourseChange = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/update-course', courseForm);
      setStudent(res.data.student);
      showMessage('Course updated successfully!', 'success');
      // Update local storage
      localStorage.setItem('student', JSON.stringify(res.data.student));
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to update course', 'error');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {student?.name}!</h2>
        <p><strong>Email:</strong> {student?.email}</p>
        <p><strong>Current Course:</strong> {student?.course}</p>
      </div>
      
      {msg.text && (
        <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>
          {msg.text}
        </div>
      )}

      <div className="dashboard-grid">
        <div className="card">
          <h3>Update Course</h3>
          <form onSubmit={handleCourseChange}>
            <div className="form-group">
              <label>Select New Course</label>
              <select 
                value={courseForm.course} 
                onChange={(e) => setCourseForm({ course: e.target.value })} 
                required
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Engineering">Engineering</option>
                <option value="Economics">Economics</option>
                <option value="Literature">Literature</option>
              </select>
            </div>
            <button type="submit" className="btn btn-secondary">Update Course</button>
          </form>
        </div>

        <div className="card">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Old Password</label>
              <input 
                type="password" 
                value={passForm.oldPassword} 
                onChange={(e) => setPassForm({...passForm, oldPassword: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                value={passForm.newPassword} 
                onChange={(e) => setPassForm({...passForm, newPassword: e.target.value})} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-danger">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
