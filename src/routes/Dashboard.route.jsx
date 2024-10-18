import DashboardComponent from "../components/dashboard/Dashboard.component";
import {APP_NAME} from "../App.config";

function DashboardRoute() {
    document.title = "Dashboard - " + APP_NAME;

    return (
        <main>
            <DashboardComponent/>
        </main>

    );
}

export default DashboardRoute;