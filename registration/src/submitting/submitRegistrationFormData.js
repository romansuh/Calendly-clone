export const submitSignInFormData = (values, dispatch, signInUser, navigate) => {
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
                dispatch(signInUser(storedUser));
                navigate('/welcome');
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    } else {
        if (window.confirm('User not found. Do you want to sign up?')) navigate('/signup');
    }
}

export const submitSignUpFormData = (values, dispatch, signUpUser, navigate) => {
    const user = {
        email: values.email,
        username: values.name,
        password: values.password,
    };

    dispatch(signUpUser(user));
    alert('Sign up successful!');
    navigate('/welcome');
}
