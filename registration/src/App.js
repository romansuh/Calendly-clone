import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import WelcomePage from "./components/WelcomePage/WelcomePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/signin"/>}/>

                <Route path="/signin" element={<SignInForm/>}/>
                <Route path="/signup" element={<SignUpForm/>}/>
                <Route path="/welcome" element={<WelcomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
