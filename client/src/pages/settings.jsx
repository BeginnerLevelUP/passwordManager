import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EMAIL_STATUS,UPDATE_ACCOUNT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_ME } from '../../utils/queries';
function SettingsPage() {
  //Mutation
  const [changeEmailStatus,{error:emailUpdate,data:emailData}]=useMutation(EMAIL_STATUS)
  const [updateAccount,{error:errorAccount,data:updateData}]=useMutation(UPDATE_ACCOUNT)
  //Auth
  const authUsername=Auth.getProfile()?.data?.username
  const authEmail=Auth.getProfile()?.data?.email
  const id=Auth.getProfile()?.data?._id
  // State 
  const [username, setUsername] = useState(authUsername);
  const [email, setEmail] = useState(authEmail);
  const [password, setPassword] = useState('********');
  const [allowUpdates, setAllowUpdates] = useState(true);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const handleUsernameEdit = () => {
    setTempUsername(username);
    setIsUsernameEditing(true);
  };

  const handleEmailEdit = () => {
    setTempEmail(email);
    setIsEmailEditing(true);
  };

  const handlePasswordEdit = () => {
    setTempPassword(password);
    setIsPasswordEditing(true);
  };

  const handleAllowUpdatesChange = async(event) => {
    setAllowUpdates(event.target.checked);
    const {data}= await changeEmailStatus({
      variables:{
        id,
        status:!allowUpdates
      },
      refetchQueries:[{query:QUERY_ME}]
    })
  };

  const handleUsernameChange = (event) => {
    setTempUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setTempEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setTempPassword(event.target.value);
  };

  const handleCancel = (field) => {
    switch (field) {
      case 'username':
        setIsUsernameEditing(false);
        setTempUsername(username);
        break;
      case 'email':
        setIsEmailEditing(false);
        setTempEmail(email);
        break;
      case 'password':
        setIsPasswordEditing(false);
        setTempPassword(password);
        break;
      default:
        break;
    }
  };

  const handleSave =async (field) => {
    switch (field) {
      case 'username':
        setUsername(tempUsername);
       await updateAccount({
      variables:{
        id,
        username:tempUsername
      },
      refetchQueries:[{query:QUERY_ME}]
    })
        setIsUsernameEditing(false);
        break;
      case 'email':
        setEmail(tempEmail);
      await updateAccount({
      variables:{
        id,
        email:tempEmail
      },
      refetchQueries:[{query:QUERY_ME}]
    })
        setIsEmailEditing(false);
        break;
      case 'password':
        setPassword(tempPassword);
        await updateAccount({
      variables:{
        id,
        password:tempPassword
      },
      refetchQueries:[{query:QUERY_ME}]
    })
        setIsPasswordEditing(false);
        break;
      default:
        break;
    }
  };
return (
  <div>
    {!Auth.loggedIn() ? (
      <h1>Must Be Logged In</h1>
    ) : (
      <div>
        <h1 className="title" >Settings</h1>
        <div>
          <p>
            Username: {isUsernameEditing ? (
              <>
                <input type="text" value={tempUsername} onChange={handleUsernameChange} />
                <button onClick={() => handleSave('username')}>Save</button>
                <button onClick={() => handleCancel('username')}>Cancel</button>
              </>
            ) : (
              <>
                <span>{username}</span>
                <button onClick={handleUsernameEdit}>Edit</button>
              </>
            )}
          </p>
        </div>
        <div>
          <p>
            Email: {isEmailEditing ? (
              <>
                <input type="email" value={tempEmail} onChange={handleEmailChange} />
                <button onClick={() => handleSave('email')}>Save</button>
                <button onClick={() => handleCancel('email')}>Cancel</button>
              </>
            ) : (
              <>
                <span>{email}</span>
                <button onClick={handleEmailEdit}>Edit</button>
              </>
            )}
          </p>
        </div>
        <div>
          <p>
            Password: {isPasswordEditing ? (
              <>
                <input type="password" value={tempPassword} onChange={handlePasswordChange} />
                <button onClick={() => handleSave('password')}>Save</button>
                <button onClick={() => handleCancel('password')}>Cancel</button>
              </>
            ) : (
              <>
                <span>{password}</span>
                <button onClick={handlePasswordEdit}>Edit</button>
              </>
            )}
          </p>
        </div>
        <div>
          <input
            type="checkbox"
            checked={allowUpdates}
            onChange={handleAllowUpdatesChange}
          />
          <label>Allow Updates</label>
        </div>
      </div>
    )}
  </div>
);
 }
export default SettingsPage
