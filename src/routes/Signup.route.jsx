import {APP_NAME, USER_LOGGED_IN_ENTRANCE} from "../App.config";
import SignupComponent from "../components/signup/Signup.component";

function SignupRoute() {
    document.title = "Sign up - " + APP_NAME;

    if (JSON.parse(localStorage.getItem("user"))) {
        window.location.href = USER_LOGGED_IN_ENTRANCE;
    }

    return (
        <main>
            <SignupComponent />
        </main>
    );
}

export default SignupRoute;