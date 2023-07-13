import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import { User_Registration } from './components/User_Registration';
import { LoginForm } from './components/loginForm/LoginForm';
import { Home } from './components/home/Home.js';
import { UserProvider } from './UserContext';
import App  from './App';




const AppRouter = () => {
    return (
        <BrowserRouter>
            
            <UserProvider>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/api/login" element={<LoginForm/>}/>
                    <Route path="/api/registration" element={<User_Registration/>}/>
                    <Route path="/api/home" element={<Home/>}/>
                </Routes>
            </UserProvider>
                
            
        
        </BrowserRouter>
    )
}


export default AppRouter;