import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import SignInForm from './Components/SignInForm/SignInForm';
import WelcomePage from "./Components/WelcomePage/WelcomePage";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/signin"/>}/>

                    <Route path="/signin" element={<SignInForm/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/welcome" element={<WelcomePage/>}/>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
