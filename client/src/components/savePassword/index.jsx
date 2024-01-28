import { useState } from 'react';
import { Form, Button,Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_ACCOUNT } from '../../../utils/mutations';
import { QUERY_ME } from '../../../utils/queries';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
function SavePassword({Password}){
//Mutation
const [addAccount,{error,data}]=useMutation(ADD_ACCOUNT)
  //Query
const { loading, data: dataME } = useQuery(QUERY_ME);
const username =  dataME?.me?.username || null  ;


  // For Modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// For Toast
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState('top-start');

  // For Form
const [formUsername, setUsername] = useState('');
const [formEmail, setEmail] = useState('');
const [formWebsite, setWebsite] = useState('');
const [formPassword, setPassword] = useState('');
const [formNotes, setNotes] = useState('Untitled Password');

  //For Adding Account
  const [fillAccount,setAdd]=useState(false)

// Visibility of password 
const [viewPassword,setView]=useState('password')
const onPasswordClick = () => {
  const type = viewPassword === 'password' ? 'text' : 'password';
  setView(type);
};
  //Event Listeners
  const handleChange = (e,stateChange) => {
    stateChange(e.target.value);
  };

  const handleFormSubmit=async(event)=>{
    event.preventDefault()
    try{
      const {data}=await addAccount({
        variables:{
          passwordText:formPassword,
          currentUsername:username,
          username:formUsername,
          websiteUrl:formWebsite,
          email:formEmail,
          // webkitURL: create on
          notes:formNotes
        },
        // fix
        refetchQueries:{QUERY_ME}
      })

      console.log(data)
    }
     catch(e){
    console.error(e)
  }
  }
  
  const toggleToast = () => setShowToast(!showToast);

  const onAddClick=()=>{
    setAdd(!fillAccount)
  }
return (
  <>
    {Password ? (
      <button variant="primary" onClick={() => {
        setPassword(Password);
        handleShow();
      }}>
        Save Password
      </button>
    ) : (
      <>
  <button onClick={()=>{setShowToast(!showToast);}} className="mb-2">
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
                  <Toast.Body>Nothing To Save</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          )}
          </>
    )}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* make the width of the modal wider so the text below fits in one line */}
        <Modal.Title>{username} Save your password for later use </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        {fillAccount?(
<>
<Modal.Body>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="username" value={formUsername} onChange={(e) => handleChange(e, setUsername)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={formEmail} onChange={(e) => handleChange(e, setEmail)} />
          </Form.Group>

          <Form.Group controlId="formWebsite">
            <Form.Label>Website Url:</Form.Label>
            <Form.Control type="text" name="websiteUrl" value={formWebsite} onChange={(e) => handleChange(e, setWebsite)} />
          </Form.Group>

          <Form.Group controlId="formNotes">
            <Form.Label>Notes:</Form.Label>
            <Form.Control as="textarea" name="notes" value={formNotes} onChange={(e) => handleChange(e, setNotes)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type={viewPassword}
              name="password"
              value={formPassword}
              onChange={(e) => handleChange(e, setPassword)}
              onClick={onPasswordClick}
            />
            <Form.Text className="text-muted">
              Click to View And Edit Password
            </Form.Text>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleClose}>
            Save Password
          </Button>
        </Modal.Footer>
</>
        ):(
<>
<Modal.Body>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type={viewPassword}
              name="password"
              value={formPassword}
              onChange={(e) => handleChange(e, setPassword)}
              onClick={onPasswordClick}
            />
            <Form.Text className="text-muted">
              Click to View And Edit Password
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleClose}>
            Save Password
          </Button>
          <Button variant="success" type='submit' onClick={onAddClick} >
            Add Account
          </Button>
        </Modal.Footer>
</>
        )}
        
      </Form>
    </Modal>
  </>
);


}
export default SavePassword