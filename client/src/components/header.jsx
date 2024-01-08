import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Header() {
  // Logout User
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      {!Auth.loggedIn() ? (
        <>
          <Link to='/login'>
            <button>
              Login
            </button>
          </Link>

          <Link to='/signup'>
            <button>
              Signup
            </button>
          </Link>
        </>
      ) : (
        <>
          <h1>
            Password <span>Generator</span>
          </h1>

          <h2>Meant to generate the password of your dreams!!!</h2>

          <Link to='/'>
            <button>
              Home
            </button>
          </Link>

          <a onClick={logout} href='/'>
            Logout
          </a>
        </>
      )}
    </header>
  );
}



export default Header