import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";

function CoursesComponent() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        getCourseData();
    }, []);

    const getCourseData = async () => {
        let result = await udc.get("courses", "", {})
                .then((data) => { return data })
                .catch((data) => { return data });

        if (result.status === 200) {
            setCourseData(result.data);
        }
    }


    return (
        <>
            {
                courseData.map(course => (
                    <div key={course.id}>
                        <h2>Course: {course.name}</h2>
                        <p>Code: {course.code}</p>
                        <p>Description: {course.description}</p>
                        <p>Department: {course.department}</p>
                        <p>Program: {course.program}</p>
                        <p>Term: {course.term}</p>
                        <p>Start Date: {course.startDate}</p>
                        <p>End Date: {course.endDate}</p>
                        <p>Week Day: {course.weekDay}</p>
                        <p>Start Time: {course.startTime}</p>
                        <p>End Date: {course.endTime}</p>
                        <p>Campus: {course.campus}</p>
                        <p>Delivery Method: {course.deliveryMethod}</p>
                        <p>Max Seats: {course.maxSeats}</p>
                        <p>Available Seats: {course.availableSeats}</p>
                    </div>
                ))
            }
        </>
    );
}

export default CoursesComponent