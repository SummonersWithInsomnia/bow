import {APP_NAME} from "../App.config";
import CreateCourseComponent from "../components/courses/CreateCourse.component";

function CreateCourseRoute() {
    document.title = "Create Course - " + APP_NAME;

    return (
        <main>
            <CreateCourseComponent />
        </main>
    );
}

export default CreateCourseRoute;