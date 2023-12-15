import './App.css';
import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UserEventsPage from "./components/UserEventsPage/UserEventsPage";
import {NAVIGATION_PATHS} from "./common/constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {getToken, logInUser} from "./store/reducers/users/userSlice";


const App = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.users.token);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getToken());
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            if (!(location.pathname === NAVIGATION_PATHS.SIGN_UP)) {
                navigate(NAVIGATION_PATHS.SIGN_IN);
            }
        } else {
            dispatch(
                logInUser(
                    JSON.parse(atob(token))
                )
            );
            navigate(NAVIGATION_PATHS.USER_EVENTS_PAGE);
        }
    }, [dispatch, token, navigate, location]);
    return (
        <Routes>
            <Route path={NAVIGATION_PATHS.USER_EVENTS_PAGE} element={<UserEventsPage/>}/>
            <Route path={NAVIGATION_PATHS.SIGN_IN} element={<SignInForm/>}/>
            <Route path={NAVIGATION_PATHS.SIGN_UP} element={<SignUpForm/>}/>
        </Routes>
    );
};

export default App;
