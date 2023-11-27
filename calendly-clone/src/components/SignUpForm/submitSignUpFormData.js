import {NAVIGATION_PATHS} from "../../common/constants";

export const submitSignUpFormData = (values, callDispatch, callNavigate) => {
    const user = {
        email: values.email,
        username: values.username,
        password: values.password,
    };

    callDispatch(user);
    alert('Sign up successful!');
    callNavigate(NAVIGATION_PATHS.CREATE_EVENT_PAGE);
}
