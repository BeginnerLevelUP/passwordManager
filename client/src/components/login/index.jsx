import React, { useState } from 'react';
import { Form, Button,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import GenPassword from '../genPassword';

function LoginOrSignUp() {
  //For Props
  const [password,setPassword]=useState('')
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
  //Passing Props Event Listener
  const onGen=(password)=>{
    setPassword(password)
  }
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

  setFormStateSignup((prevState) => ({
    ...prevState,
    [name]: value,
  }));

  if(name==='password'){
 onGen(value);
  }
    
 
  
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

  // Visibility of password 
const [viewPassword,setView]=useState('password')
const onPasswordClick = () => {
  const type = viewPassword === 'password' ? 'text' : 'password';
  setView(type);
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
<Form onSubmit={handleFormSubmitLogin}>
  <Form.Group controlId="formEmailOrUsername">
    <Form.Control
      type="text"
      placeholder="Your email or username"
      name="email"
      value={formStateLogin.email}
      onChange={handleChangeLogin}
      className="form-input"
    />
  </Form.Group>

  <Form.Group controlId="formPassword">
    <Form.Control
      type={viewPassword}
      onClick={onPasswordClick}
      placeholder="******"
      name="password"
      value={formStateLogin.password}
      onChange={handleChangeLogin}
      className="form-input"
    />
    <Form.Text className="text-muted" onClick={onPasswordClick}>
      Click to View And Edit Password
    </Form.Text>
  </Form.Group>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseLogin}>
      Cancel
    </Button>
    <Button type="submit" variant="primary" onClick={handleCloseLogin}>
      Login
    </Button>
    <Button variant="success" onClick={handleShowSignup}>
      Sign Up
    </Button>
  </Modal.Footer>
</Form>
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
<Form onSubmit={handleFormSubmitSignup}>
  <Form.Group controlId="formUsername">
    <Form.Control
      type="text"
      placeholder="Your username"
      name="username"
      value={formStateSignup.username}
      onChange={handleChangeSignup}
      className="form-input"
    />
  </Form.Group>

  <Form.Group controlId="formEmail">
    <Form.Control
      type="email"
      placeholder="Your email"
      name="email"
      value={formStateSignup.email}
      onChange={handleChangeSignup}
      className="form-input"
    />
  </Form.Group>

  <Form.Group controlId="formPassword">
    <Form.Control
      type={viewPassword}
      onClick={onPasswordClick}
      placeholder="******"
      name="password"
      value={password}
      onChange={handleChangeSignup}
      className="form-input"
    />
    <Form.Text className="text-muted" onClick={onPasswordClick}>
      Click to View And Edit Password
    </Form.Text>
  </Form.Group>

      <GenPassword onGen={onGen}  forSignUp={true}></GenPassword>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseSignup}>
      Cancel
    </Button>
    <Button type="submit" variant="primary" onClick={handleCloseSignup}>
      Sign Up
    </Button>
  </Modal.Footer>
</Form>
              </>
            )}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginOrSignUp;
