import { useState } from "react";
import { useAuth } from "../context/AuthContext1";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  const { register, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success =
      type === "login" ? login(email, password) : register(email, password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials or user already exists");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{type === "login" ? "Login" : "Register"}</h2>
      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
