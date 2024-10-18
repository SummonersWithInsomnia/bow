import {APP_NAME} from "../App.config";

function NotFoundRoute() {
    document.title = "404 Not Found - " + APP_NAME;

    return (
        <main>
            <h2>404 Not Found</h2>
            <p>The requested page was not found.</p>
        </main>
    );
}

export default NotFoundRoute;