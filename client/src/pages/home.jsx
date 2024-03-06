import Auth from "../../utils/auth";
import SavePassword from "../components/savePassword";
import GenPassword from "../components/genPassword"
import PasswordStatus from "../components/pwdStatus";
import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import "./home.css"
function HomePage() {
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState('top-start');
  const [password,setPassword]=useState('')

  const onSaveClick = () => {
    setShowToast(!showToast);
  };
  const onGen=(password)=>{
    setPassword(password)
  }

  const onCopyClick=()=>{
      navigator.clipboard.writeText(password)
      // get some sort of conformation message
  }

  const toggleToast = () => setShowToast(!showToast);

  return (
    <>
                <h4>Type Or Click Generate Button</h4>
    <section>

    <article>
      <PasswordStatus userResults={password}></PasswordStatus>
    </article>


      <article>
      <GenPassword onGen={onGen} forSignUp={false}></GenPassword>
      {!Auth.loggedIn() ? (
        <>
          <button onClick={onSaveClick} className="mb-2">
            Save Password
          </button>

          {showToast && (
            <div>
              <ToastContainer
                className="p-3"
                position={position}
                style={{ zIndex: 1 }}
              >
                <Toast onClose={toggleToast}>
                  <Toast.Header closeButton={false}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Error</strong>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={toggleToast}
                    ></button>
                  </Toast.Header>
                  <Toast.Body>Must have an account to save password</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          )}
        </>
      ) : (
        <SavePassword Password={password}></SavePassword>
      )}
      <img src='/icons/clipboard.png' onClick={onCopyClick}></img>
      </article>

    </section>

    </>
  );
}

export default HomePage;
