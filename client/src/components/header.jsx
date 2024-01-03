import { Link } from "react-router-dom"
import Auth from "../../utils/auth"
function Header(){

      // Logout User
   const logout = (event) => {
    event.preventDefault();
    Auth.logout();}
    return(
        <>
        <header>
  <h1>
    Password 
    <span>Generator</span>
  </h1>

  <h2>Meant to generate the password of your dreams!!!</h2>

  <button>
      <Link to='/'>Home</Link>
  </button>

  <button>
      <Link to='/login'>Login</Link>
  </button>

  <button>
      <Link to='/signup'>Signup</Link>
  </button>


  <a onClick={logout}>
     Logout
  </a>
</header>
        </>
    )
}

export default Header