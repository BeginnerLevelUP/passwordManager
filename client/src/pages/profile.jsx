import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

function ProfilePage() {
  const { loading, data: dataME } = useQuery(QUERY_ME);
  const username = dataME?.me?.username || null;
  const email = dataME?.me?.email || null;
  const accounts = dataME?.me?.accounts || null;
    console.log(accounts)
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
        {!Auth.loggedIn ? (
          <h1>Must Be Logged In</h1>
        ) : (
          <>
            <h1>Hello {username}</h1>
            <h2>{email}</h2>
            {accounts.map((account, index) => (
              <div key={index}>
                <h3>Account {index}</h3>
                <p>{account.created}</p>
                <p>{account.username}</p>
                <p>{account.email}</p>
                <p>{account.websiteUrl}</p>
                <p>{account.notes}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
