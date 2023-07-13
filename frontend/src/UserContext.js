import React, {createContext, useState, useEffect } from 'react';
import api from './Api'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user,setUser] = useState({
        username:"",
        email:"",
        e_rupee:"",

    })
    const updateUser = (userData) => {
        setUser(userData)
    }  
    const logOut = () => {
        setUser({
            username:"",
            email:"",
            e_rupee:"",
    
        })
    }

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await api.get('/user');
            const userData = response.data;
            console.log(userData)
            setUser(userData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUser(); // Fetch user data on component mount
      }, []); 
    return (
        <UserContext.Provider value={{user,updateUser,logOut}}>
            {children}
        </UserContext.Provider>
    )
}