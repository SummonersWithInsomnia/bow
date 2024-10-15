import {Link} from "react-router-dom";

const MyCourseComponent = ({courses}) => (
    <>
        {courses.map(
            (course) => (
                <tr key={course.registrationId}>
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
                    <td>{(<Link to={"/drop-course/" + course.registrationId}>Drop</Link>)}</td>
                </tr>
            )
        )}
    </>
);

export default MyCourseComponent;