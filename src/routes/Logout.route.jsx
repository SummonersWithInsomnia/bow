import LogoutComponent from "../components/logout/Logout.component";
import {APP_NAME} from "../App.config";

function LogoutRoute() {
    document.title = "Log out - " + APP_NAME;

    return (
        <main>
            <LogoutComponent/>
        </main>
    );
}

export default LogoutRoute