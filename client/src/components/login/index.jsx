import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

function LoginOrSignUp() {
  // Login State
  const [showLogin, setShowLogin] = useState(false);
  // Signup State
  const [showSignup, setShowSignup] = useState(false);
  // Login State
  const [formStateLogin, setFormStateLogin] = useState({
    email: '',
    password: '',
  });
  // Signup State
  const [formStateSignup, setFormStateSignup] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Login Data
  const [login, { error: errorLogin, data: dataLogin }] = useMutation(LOGIN);
  // Signup Data
  const [signup, { error: errorSignup, data: dataSignup }] = useMutation(SIGNUP);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  // Signup Event Listener
  const handleCloseSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  };
  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  // Login Event Listeners
  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setFormStateLogin({
      ...formStateLogin,
      [name]: value,
    });
  };

  const handleFormSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formStateLogin },
      });

      if (data && data.login) {
        console.log(data.login);
        Auth.login(data.login.token);
      }
    } catch (error) {
      console.error(error);
    }

    setFormStateLogin({
      email: '',
      password: '',
    });
  };

  // Signup Event Listeners
  const handleChangeSignup = (event) => {
    const { name, value } = event.target;

    setFormStateSignup({
      ...formStateSignup,
      [name]: value,
    });
  };

  const handleFormSubmitSignup = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signup({
        variables: { ...formStateSignup },
      });

      if (data && data.signup) {
        Auth.login(data.signup.token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Login modal */}
      <button onClick={handleShowLogin}>Login </button>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <h1>LOGIN</h1>
            {dataLogin ? (
              <p>
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmitLogin}>
                <input
                  className="form-input"
                  placeholder="Your email or username"
                  name="email"
                  value={formStateLogin.email}
                  onChange={handleChangeLogin}
                />

                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formStateLogin.password}
                  onChange={handleChangeLogin}
                />

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseLogin}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleCloseLogin}>
                    Login In
                  </Button>
                  <Button variant="success" onClick={handleShowSignup}>
                    Sign Up
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </>
        </Modal.Body>
      </Modal>

      {/* Signup modal */}
      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {dataSignup ? (
              <p>
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                <h1>SIGN UP</h1>
                <form onSubmit={handleFormSubmitSignup}>
                  <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formStateSignup.username}
                    onChange={handleChangeSignup}
                  />
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formStateSignup.email}
                    onChange={handleChangeSignup}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formStateSignup.password}
                    onChange={handleChangeSignup}
                  />
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSignup}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleCloseSignup}>
                      Sign Up
                    </Button>
                  </Modal.Footer>
                </form>
              </>
            )}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginOrSignUp;
