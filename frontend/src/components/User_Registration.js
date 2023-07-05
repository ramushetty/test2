import React, { useState } from 'react'
import axios from 'axios';
import "./User_Registration.css"; // Import the CSS file
export const User_Registration = () => {

  const [userData,setUserData] = useState({
    name: "",
    email:"",
    password:"",
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const {name,value} = event.target;
    setUserData((prevUserData) => ({
        ...prevUserData, 
        [name]:value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        try{
            const response = await axios.post("http://localhost:5000/api/users", userData);
            console.log(response.data);
            setUserData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        } catch (error) {
            console.error(error)
        }
        
    }
  };

  const validateForm = () => {
    const errors = {}

    if (!userData.name.trim()) {
        errors.name = "Name is required";
    }
    if (!userData.email.trim()) {
        errors.email = 'Email is required';
      }
  
    if (!userData.password.trim()) {
    errors.password = 'Password is required';
    } else if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
    
  return (
    <div className="container">
        <div>User Registration</div>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">User Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}

            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input 
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                />
                {errors.confirmPassword && <span >{errors.confirmPassword}</span>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
    
  )
}
