import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_USER_ACCOUNT, VIEW_PASSWORD, DELETE_USER_ACCOUNT } from "../../utils/mutations";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Email from "../../utils/email";
//Icons
 import hideIcon from "/icons/hide.png"
 import showIcon from "/icons/view.png"
import "./profile.css"
function ProfilePage() {
  // Mutations and Queries
  const { loading: loadingME, data: dataME } = useQuery(QUERY_ME);
  // Query Me
  const username = dataME?.me?.username || null;
  const email = dataME?.me?.email || null;
  const accounts = dataME?.me?.accounts || null;
  const emailStatus=dataME?.me.allowUpdates
  const [updateAccount, { error: errorUpdate, data: dataUpdate }] = useMutation(UPDATE_USER_ACCOUNT);
  const [viewPassword, { error: errorPassword, data: dataPassword }] = useMutation(VIEW_PASSWORD);
  const [deleteAccount, { error: errorDelete, data: dataDelete }] = useMutation(DELETE_USER_ACCOUNT);
  // State
  const [edit, setEdit] = useState({
    edit: false,
    index: null,
  });

  const [view, setView] = useState(true);

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    passwordText: '',
    websiteUrl: '',
    notes: '',
  });

  const onClickEdit = (index) => {
    setEdit({
      edit: true,
      index: index,
    });

    // Set initial form values based on the selected account
    const selectedAccount = accounts[index];
    setFormValues({
      username: selectedAccount.username || '',
      email: selectedAccount.email || '',
      passwordText: '',
      websiteUrl: selectedAccount.websiteUrl || '',
      notes: selectedAccount.notes || '',
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onViewClick = async (id,show) => {
    const { data } = await viewPassword({
      variables: {
        accountId: id,
        show
      },
    });
    console.log(data)
    setView(!view)
  };

  const onEditFormSubmit = async (currentAccountId) => {
    const { data } = await updateAccount({
      variables: {
        currentAccountId,
        ...formValues,
      },
      refetchQueries: [{ query: QUERY_ME }],
    });
    setEdit({
      edit: false,
      index: null,
    });

    window.location.reload();
  };

  const onDeleteClick = async (accountId) => {
    const { data } = await deleteAccount({
      variables: { accountId },
      refetchQueries: [{ query: QUERY_ME }],
    });
  };

  if (loadingME) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  Email(accounts,emailStatus)
  return (
    <>
      <div>
        {!Auth.loggedIn() ? (
          <h1>Must Be Logged In</h1>
        ) : (
          <>
            <h1 className="title">Welcome Back {username}</h1>
            <div  id="profile">
            {accounts && accounts.length > 0 ? (
              // Display account details if there are accounts
              accounts.map((account, index) => (
                
                <div key={index} className="container">
                  <div>
                    <h3>Account: {index+1}</h3>
                    <p>Create On: {account.created}</p>
                    <p>Updated On: {account.updated}</p>
                    <img
                      src='/icons/edit.png' 
                      alt='Edit Icon'
                      className="icon"
                      onClick={() => {
                        onClickEdit(index);
                      }}
                    />
                    <img
                      src='/icons/delete.png' 
                      alt='Delete Icon'
                      className="icon"
                      onClick={() => {
                        onDeleteClick(account._id);
                      }}
                    />
                  </div>
                  {edit.edit && edit.index === index ? (
                    // Display edit form only for the selected account
        
                      <form 
                        onSubmit={() => {
                          onEditFormSubmit(account._id);
                        }}
                      >
                        {/* Replace with your input fields */}
                        <div className="edit">
                        <input
                          type='text'
                          name='username'
                          placeholder='Username'
                          value={formValues.username}
                          onChange={onInputChange}
                        />

                        <input
                          type='text'
                          name='email'
                          placeholder='Email'
                          value={formValues.email}
                          onChange={onInputChange}
                        />

                        <input
                          type='text'
                          name='passwordText'
                          placeholder='Password'
                          value={formValues.passwordText}
                          onChange={onInputChange}
                        />

                        <input
                          type='text'
                          name='websiteUrl'
                          placeholder='Website Url'
                          value={formValues.websiteUrl}
                          onChange={onInputChange}
                        />

                        <input
                          type='text'
                          name='notes'
                          placeholder='Notes'
                          value={formValues.notes}
                          onChange={onInputChange}
                        />
</div>
                        <button type="submit">Submit</button>
                        <button onClick={() => { setEdit({ edit: false, index: null }); }}>Cancel</button>
                      </form>
                  ) : (
                    // Display account details
                    <>
                      <p>Username: {account.username}</p>
                      <p>Email: {account.email}</p>
                      {view ? (
                        <p>Password (Encrypted): {account.password.text.substring(0, 10)}.....</p>
                      ) : (
                        <p>Password: {account.password.text}</p>
                      )}
                      <img onClick={() => { onViewClick(account._id,view); }} src={view === true ? showIcon : hideIcon} className='icon' alt='eye icon' />
                      <p>Website Url: {account.websiteUrl}</p>
                      <p>Notes: {account.notes}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              // Display a message if there are no accounts
              <h1>No passwords saved</h1>
            )}
         </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
