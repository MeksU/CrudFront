import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.log(errorData);
        setError(errorData);
        return;
      }

      const data = await response.json();
      onLogin(data.id);
    } catch (error) {
      setError("Niepoprawny login lub hasło!");
      console.error("Niepoprawny login lub hasło!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;