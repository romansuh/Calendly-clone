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
                callNavigate('/welcome');
            } else {
                alert('Incorrect password. Please try again.');
            }
        }
    } else {
        if (window.confirm('User not found. Do you want to sign up?')) callNavigate('/signup');
    }
}