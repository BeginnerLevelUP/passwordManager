import Auth from "../../utils/auth";
import { useQuery,useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_USER_ACCOUNT,VIEW_PASSWORD } from "../../utils/mutations";
import { useState} from "react";
import {Navigate} from "react-router-dom"
function ProfilePage() {
  //Mutations and Queries
  const { loading:loadingME, data: dataME } = useQuery(QUERY_ME);
    //Query Me
  const username = dataME?.me?.username || null;
  const email = dataME?.me?.email || null;
  const accounts = dataME?.me?.accounts || null;

  const [updateAccount,{error:errorUpdate,data:dataUpdate}]=useMutation(UPDATE_USER_ACCOUNT)
  const [viewPassword,{error:errorPassword,data:dataPassword}]=useMutation(VIEW_PASSWORD)
  //State
  const [edit,setEdit]=useState({
    edit:false,
    index:null
  })

  const [view,setView]=useState(false)
 
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

  const onViewClick=async(id)=>{
    const {data}=await viewPassword({
      variables:{
          accountId:id
      }
    })
    setView(!view)
  }

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
  
 const onDeleteClick=async(accountId)=>{

 }

  if (loadingME) {
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
                    <p>Updated On: {account.updated}</p>
                    <img
                      src=''
                      alt='Edit Icon'
                      onClick={() => {
                        onClickEdit(index);
                      }}
                    />
                      <img
                      src=''
                      alt='Delte Icon'
                      onClick={() => {
                        onDeleteClick(id);
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

                  <button type="submit">Submit</button>
                  <button onClick={()=>{    setEdit({edit: false,index: null,});}}>Cancel</button>
                  </form>
                    </>
                  ) : (
                    // Display account details
                    <>
                    {/* gives these all divs */}
                     <p>Username: {account.username}</p>
                <p>Email : {account.email}</p>
                {
                  !view?(
                <p>Password (Encrypted): {account.password.text.substring(0, 10)}.....</p> 
                  ):(
                <p>Password: {account.password.text}</p> 
                  )
                }
                      <img onClick={()=>{onViewClick(account._id)}}src='' alt='eye icon'></img>
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
