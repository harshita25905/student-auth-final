import axios from "axios";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({});

  const submit = async () => {
    const res = await axios.post("https://student-auth-3-an4x.onrender.com/api/login", form);
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}

export default Login;