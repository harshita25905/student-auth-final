import axios from "axios";
import { useState } from "react";

function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post("https://student-auth-3-an4x.onrender.com/api/register", form);
    alert("Registered!");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
      <input placeholder="Course" onChange={e => setForm({...form, course:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}

export default Register;