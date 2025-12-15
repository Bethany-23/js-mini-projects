import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button>Signup</button>
    </form>
  );
};

export default Signup;
