import CourseDetailsComponent from "../components/courses/CourseDetails.component";
import {useParams} from "react-router-dom";
import {APP_NAME} from "../App.config";

function CourseDetailsRoute() {
    const { id } = useParams();

    document.title = "Course Details - " + APP_NAME;

    return (
        <main>
            <CourseDetailsComponent id={id}/>
        </main>
    );
}

export default CourseDetailsRoute;