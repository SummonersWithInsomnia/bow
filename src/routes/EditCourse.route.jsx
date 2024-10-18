import {useParams} from "react-router-dom";
import {APP_NAME} from "../App.config";
import EditCourseComponent from "../components/courses/EditCourse.component";

function EditCourseRoute() {
    const {id} = useParams();
    document.title = "Edit Course - " + APP_NAME;

    return (
        <main>
            <EditCourseComponent id={id}/>
        </main>
    );
}

export default EditCourseRoute;