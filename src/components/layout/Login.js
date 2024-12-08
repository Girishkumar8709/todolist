import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <h2>Welcome to the Todo List App</h2>
      <button
        className="login-button"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;


