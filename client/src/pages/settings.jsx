import React, { useState } from 'react';

function SettingsPage() {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
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

  const handleAllowUpdatesChange = (event) => {
    setAllowUpdates(event.target.checked);
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

  const handleSave = (field) => {
    switch (field) {
      case 'username':
        setUsername(tempUsername);
        setIsUsernameEditing(false);
        break;
      case 'email':
        setEmail(tempEmail);
        setIsEmailEditing(false);
        break;
      case 'password':
        setPassword(tempPassword);
        setIsPasswordEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Settings</h1>
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
  );
}

export default SettingsPage;
