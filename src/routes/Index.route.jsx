import {APP_NAME} from "../App.config";

function IndexRoute() {
    document.title = APP_NAME;

    return (
        <main>
            <h2>Welcome to Bow School Registration</h2>
        </main>
    );
}

export default IndexRoute;