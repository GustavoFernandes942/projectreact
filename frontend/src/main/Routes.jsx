import React from "react";
import { Routes, Route, Navigate} from 'react-router-dom'

import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import loginform from '../components/user/loginform';
import RegisterForm from '../components/user/RegisterForm';

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/home"element={<Home/>}/>
            <Route path="/home"element={<Home/>}/>
            <Route path="/home"element={<Home/>}/>
            <Route path="/home"element={<Home/>}/>
            <Route path="/home"element={<Home/>}/>
        </Routes>
    );
}