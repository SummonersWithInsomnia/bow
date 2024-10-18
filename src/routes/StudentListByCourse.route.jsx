import {APP_NAME} from "../App.config";
import {useParams} from "react-router-dom";
import StudentListByCourseComponent from "../components/student-list/StudentListByCourse.component";

function StudentListByCourseRoute() {
    document.title = "Student List by Course - " + APP_NAME;
    const {id} = useParams();

    return (
        <main>
            <StudentListByCourseComponent id={id}/>
        </main>
    )
}

export default StudentListByCourseRoute;