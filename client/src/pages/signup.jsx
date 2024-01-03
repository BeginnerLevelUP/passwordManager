import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../utils/mutations';
import Auth from '../../utils/auth'

function SignupPage(){
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [signup, { error, data }] = useMutation(SIGNUP);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await signup({
        variables: { ...formState },
      });

      Auth.login(data.signup.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
   {data ? (
            <p>
                <Link to="/">back to the homepage.</Link>
              </p>
   ):(
<form onSubmit={handleFormSubmit}>
                    <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />

                  <button type="submit" >
                  Submit
                </button>
    </form>
   )}
    </>
  );
};

export default SignupPage;
