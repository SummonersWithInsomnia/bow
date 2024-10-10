import LoginComponent from "../components/login/Login.component";
import {APP_NAME, USER_LOGGED_IN_ENTRANCE} from "../App.config";

function LoginRoute() {
    document.title = "Log in - " + APP_NAME;

    if (JSON.parse(localStorage.getItem("user"))) {
        window.location.href = USER_LOGGED_IN_ENTRANCE;
    }

    return (
        <main>
            <LoginComponent />
        </main>
    );
}

export default LoginRoute;