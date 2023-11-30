import {NAVIGATION_PATHS} from "../../common/constants";

export const submitSignInFormData = (storedUser, callDispatch, callNavigate) => {
    if (storedUser) {
        callDispatch(storedUser);
        callNavigate(NAVIGATION_PATHS.CREATE_EVENT_PAGE);
    } else {
        if (window.confirm('User not found. Do you want to sign up?'))
            callNavigate(NAVIGATION_PATHS.SIGN_UP, {
                state: {
                    newUserEmail: storedUser.email,
                }
            });
    }
}