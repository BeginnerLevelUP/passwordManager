import { useState } from 'react';
import { Form, Button,Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_ACCOUNT } from '../../../utils/mutations';
import { QUERY_ME } from '../../../utils/queries';
import Auth from "../../../utils/auth"
function SavePassword({Password}){
    //Mutation
  const [addAccount,{error,data}]=useMutation(ADD_ACCOUNT)
  //Query
const { loading, data: dataME } = useQuery(QUERY_ME);
const username = null || dataME?.me?.username  ;

  // For Modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Form
const [formUsername, setUsername] = useState('');
const [formEmail, setEmail] = useState('');
const [formPassword, setPassword] = useState('');
const [formNotes, setNotes] = useState('');


// Getting the defaults



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
 
return (
  <>
<button variant="primary" onClick={() => {
    setPassword('password123')
    handleShow();
}}>
  Save Password
</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* make the width of the modal wider to the text below fits in one line */}
          <Modal.Title>{username} Link Your New Secure Password To An Account </Modal.Title> 
        </Modal.Header>
         <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" name="username" value={formUsername} onChange={(e) => handleChange(e,setUsername)}/>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
       <Form.Control type="email" name="email" value={formEmail} onChange={(e) => handleChange(e, setEmail)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" name="password" value={formPassword} onChange={(e) => handleChange(e, setPassword)} />
      </Form.Group>

      <Form.Group controlId="formNotes">
        <Form.Label>Notes:</Form.Label>
        <Form.Control as="textarea" name="notes" value={formNotes} onChange={(e)=>{handleChange(e,setNotes)}} />
      </Form.Group>
  



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'  onClick={handleClose}>
            Save Password
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

    </>
  );

}
export default SavePassword