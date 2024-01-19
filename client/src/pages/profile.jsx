import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

function ProfilePage() {
  const { loading, data: dataME } = useQuery(QUERY_ME);
  const username = dataME?.me?.username || null;
  const email = dataME?.me?.email || null;
  const accounts = dataME?.me?.accounts || null;

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
              <div key={index}>
                <h3>Account :{index}</h3>
                <p>Create On: {account.created}</p>
                
                <div>
                  <p>Username :{account.username}</p>
                  <img src='' alt='Edit Icon'></img>
                </div>

                <div>
                  <p>Email :{account.email}</p>
                  <img src='' alt='Edit Icon'></img>
                </div>

                <div>
                  <p>Password:{account.password.text}</p>
                  <img src='' alt='Edit Icon'></img>
                </div>

                <div>
                   <p>Website Url:{account.websiteUrl}</p>
                  <img src='' alt='Edit Icon'></img>
                </div>

                <div>
                   <p>Note:{account.notes}</p>
                  <img src='' alt='Edit Icon'></img>
                </div>

                
                
                
               
               
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
