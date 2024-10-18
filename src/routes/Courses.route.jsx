import {APP_NAME} from "../App.config";
import CoursesComponent from "../components/courses/Courses.component";

function CoursesRoute() {
    document.title = "Courses - " + APP_NAME;

    return (
        <main>
            <CoursesComponent/>
        </main>
    );
}

export default CoursesRoute