import {APP_NAME} from "../App.config";
import {useParams} from "react-router-dom";
import RegisterCourseComponent from "../components/course-registration/RegisterCourse.component";

function RegisterCourseRoute() {
    document.title = "Register Course - " + APP_NAME;
    const { id } = useParams();

    return (
        <main>
            <RegisterCourseComponent id={id}/>
        </main>
    );
}

export default RegisterCourseRoute;