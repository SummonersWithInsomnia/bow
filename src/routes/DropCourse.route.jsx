import {APP_NAME} from "../App.config";
import {useParams} from "react-router-dom";
import DropCourseComponent from "../components/course-registration/DropCourse.component";

function DropCourseRoute() {
    document.title = "Drop Course - " + APP_NAME;
    const {id} = useParams();

    return (
        <main>
            <DropCourseComponent id={id}/>
        </main>
    );
}

export default DropCourseRoute;