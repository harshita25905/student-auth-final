import axios from "axios";
import { useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [course, setCourse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateCourse = async () => {
    await axios.put(
      "https://student-auth-3-an4x.onrender.com/api/update-course",
      { course },
      { headers: { authorization: token } }
    );
    alert("Course updated");
  };

  const updatePassword = async () => {
    await axios.put(
      "https://student-auth-3-an4x.onrender.com/api/update-password",
      { oldPassword, newPassword },
      { headers: { authorization: token } }
    );
    alert("Password updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Update Course</h3>
      <input onChange={(e) => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Update</button>

      <h3>Update Password</h3>
      <input placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
      <input placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={updatePassword}>Update</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;