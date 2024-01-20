import Auth from "../../utils/auth";
import { useQuery,useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_USER_ACCOUNT } from "../../utils/mutations";
import { useState} from "react";
import {Navigate} from "react-router-dom"
function ProfilePage() {
  //Mutations and Queries
  const { loading, data: dataME } = useQuery(QUERY_ME);
  const [updateAccount,{error:errorUpdate,data:dataUpdate}]=useMutation(UPDATE_USER_ACCOUNT)

  //State
  const [edit,setEdit]=useState({
    edit:false,
    index:null
  })
 
    const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    passwordText: '',
    websiteUrl: '',
    notes: '',
  });

  //Query Me
  const username = dataME?.me?.username || null;
  const email = dataME?.me?.email || null;
  const accounts = dataME?.me?.accounts || null;

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
      passwordText: selectedAccount.password.text || '',
      websiteUrl: selectedAccount.websiteUrl || '',
      notes: selectedAccount.notes || '',
    });

    console.log(formValues)
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const onEditFormSubmit = async (currentAccountId) => {
    const {data}=await updateAccount({
      variables:{
        currentAccountId,
        ...formValues
      },
      refetchQueries:(QUERY_ME)
    })
    setEdit({
      edit: false,
      index: null,
    });
    window.location.reload()
  }

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {!Auth.loggedIn() ? (
          <h1>Must Be Logged In</h1>
        ) : (
          <>
            <h1>Hello {username}</h1>
            <h2>{email}</h2>
 {accounts &&
              accounts.map((account, index) => (
                <div key={index} >
                  <div>
                    <h3>Account: {index}</h3>
                    <p>Create On: {account.created}</p>
                    <img
                      src=''
                      alt='Edit Icon'
                      onClick={() => {
                        onClickEdit(index);
                      }}
                    />
                  </div>
                  {edit.edit && edit.index === index ? (
                    // Display edit form only for the selected account
                    <>
                   <form onSubmit={()=>{
                    onEditFormSubmit(account._id)
                   }}>

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
                          name='password'
                          placeholder='Password'
                          value={formValues.password}
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

                  <button type="submit">Submit</button>
                  </form>
                    </>
                  ) : (
                    // Display account details
                    <>
                     <p>Username: {account.username}</p>
                <p>Email : {account.email}</p>
                <p>Password: {account.password.text}</p>
                <p>Website Url: {account.websiteUrl}</p>
                <p>Notes: {account.notes}</p>
                    </>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );}

export default ProfilePage;
