import {APP_NAME} from "../App.config";
import StudentListComponent from "../components/student-list/StudentList.component";

function StudentListRoute() {
    document.title = "Student List - " + APP_NAME;

    return (
        <main>
            <StudentListComponent/>
        </main>
    );
}

export default StudentListRoute;