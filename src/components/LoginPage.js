import React, { useState, useEffect } from "react";
import UserProfile from "../utils/UserProfile";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState(UserProfile.getUserId());

  useEffect(() => {
    if (userId !== -1) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
        return;
      }

      const data = await response.json();
      UserProfile.setUserId(data);
      navigate("/home");
    } catch (error) {
      setError("Invalid e-mail or password!");
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (registerPassword !== confirmPassword) {
      setError("Passwords are not the same!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: registerMail,
          password: registerPassword,
          name,
          surname,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
        return;
      }

      setError("Registered successfully!");
      setIsLogin(true);
    } catch (error) {
      setError("Registration failed!");
    }
  };

  return (
    <div className="login-page">
      <h1 className="logo">CampaignRUD</h1>
      <div className="form-container">
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">LOGIN</button>
            <p>
              Don't have an account yet?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <h2>Register</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Surname</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div>
              <label>E-mail</label>
              <input
                type="email"
                value={registerMail}
                onChange={(e) => setRegisterMail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">REGISTER</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;