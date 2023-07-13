import React,{useState, useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import api from '../../Api'

import './LoginForm.css'

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const {updateUser} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        email,
        password
    };
    console.log(payload)
    try {
        const response = await api.post("/login", payload)
        console.log(response.data["success"])
        updateUser(response.data)


        navigate('/api/home')
        
    } catch(error) {
        console.error(error.response.data.error)
        if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage('An error occurred during login.');
        }
    }
    
  }
  return (
    <div>
        <div className='container'>
            <h1 className='login-heading'>LogIn</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className='login-input' type='email' 
                    placeholder='email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    />
                <input className='login-input'  type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button  className="login-button"  type='submit'>Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>

        </div>
        
    </div>
  )
}


