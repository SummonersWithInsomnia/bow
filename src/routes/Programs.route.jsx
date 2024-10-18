import {APP_NAME} from "../App.config";
import ProgramsComponent from "../components/programs/Programs.component";

function ProgramsRoute() {
    document.title = "Programs - " + APP_NAME;

    return (
        <main>
            <ProgramsComponent/>
        </main>
    );
}

export default ProgramsRoute