import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth'

function LoginPage(){
    const [formState,setFormState]=useState({
        email:'',
        password:''
    })
    const [login,{error,data}]=useMutation(LOGIN)

    const handleChange=(event)=>{
        const {name,value}=event.target
        setFormState({
            ...formState,
            [name]:value,
        })
    }

    const handleFormSubmit=async(event)=>{
        event.preventDefault()

        try{
            const {data}=await login({
                variables:{...formState}
            })
            console.log(data)
            Auth.login(data.login.token)
        }catch(error){
            console.error(error)
        }

        setFormState({
            email:'',
            password:''
        })

    }
    
    return(
        <>
        <h1>LOGIN</h1>
        {data ? (
            <p>
             <Link to="/">back to the homepage.</Link>
            </p>
           ) : (
        <form onSubmit={handleFormSubmit}>

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

      <button type="submit">
        Submit
      </button>
        
        </form>
           )}

        </>
    )
}

export default LoginPage