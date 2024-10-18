import {useParams} from "react-router-dom";
import {APP_NAME} from "../App.config";
import DeleteCourseComponent from "../components/courses/DeleteCourse.component";

function DeleteCourseRoute() {
    const {id} = useParams();

    document.title = "Delete Course - " + APP_NAME;

    return (
        <main>
            <DeleteCourseComponent id={id}/>
        </main>
    );
}

export default DeleteCourseRoute;