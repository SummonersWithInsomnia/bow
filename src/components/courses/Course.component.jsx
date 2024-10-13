import {Link} from "react-router-dom";

const CourseComponent = ({courses}) => (
    <>
        {courses.map((course) => (
            <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.department}</td>
                <td>{course.program}</td>
                <td>{course.term}</td>
                <td>{course.startDate}</td>
                <td>{course.endDate}</td>
                <td>{course.weekDay}</td>
                <td>{course.startTime}</td>
                <td>{course.endTime}</td>
                <td>{course.deliveryMethod}</td>
                <td>{course.availableSeats}</td>
                <td>{(<Link to={"/course-details/" + course.id}>Details</Link>)}</td>
            </tr>
        ))}
    </>
);

export default CourseComponent;