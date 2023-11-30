import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UserEventsPage from "./components/UserEventsPage/UserEventsPage";
import {NAVIGATION_PATHS} from "./common/constants";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={NAVIGATION_PATHS.SIGN_IN}/>}/>

                <Route path={NAVIGATION_PATHS.SIGN_IN} element={<SignInForm/>}/>
                <Route path={NAVIGATION_PATHS.SIGN_UP} element={<SignUpForm/>}/>
                <Route path={NAVIGATION_PATHS.USER_EVENTS_PAGE} element={<UserEventsPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
