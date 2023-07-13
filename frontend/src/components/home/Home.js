import React,{useContext} from 'react'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import api from '../../Api'

export const Home = () => {
  const navigate = useNavigate()
  const {user, logOut} = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const response = await api.post("/logout/")

      logOut(); // Call the logout function from the UserContext
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api;';
      navigate('/api/login'); // Redirect to the login page
    } catch(error) {
      console.error("Error while logout",error);
    }
    
  };
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user.name && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>e_rupee: {user.e_rupee}</p>
        </div>
      )}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>


  )
}
