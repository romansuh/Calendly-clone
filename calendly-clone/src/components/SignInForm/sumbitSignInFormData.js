import {NAVIGATION_PATHS} from "../../common/constants";

export const submitSignInFormData = (values, callDispatch, callNavigate) => {
    const user = {
        email: values.email,
        username: values.name,
        password: values.password,
    };

    if (localStorage.getItem(user.email) !== null) {
        const storedUser = localStorage.getItem(values.email);
        if (storedUser) {
            const storedUserData = JSON.parse(storedUser);
            if (storedUserData.password === values.password) {
                alert('Sign in successful!');
                callDispatch(storedUser);
                callNavigate(NAVIGATION_PATHS.WELCOME);
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    } else {
        if (window.confirm('User not found. Do you want to sign up?'))
            callNavigate(NAVIGATION_PATHS.SIGN_UP, {
                state: {
                    newUserEmail: values.email,
                }
            });
    }
}