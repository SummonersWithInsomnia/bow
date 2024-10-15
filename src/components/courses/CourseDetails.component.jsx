import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {Link} from "react-router-dom";

function CourseDetailsComponent({id}) {
    const [userInfo, setUserInfo] = useState({});
    const [courseData, setCourseData] = useState({});
    const [courseError, setCourseError] = useState("");

    useEffect(() => {
        getUserInfo();
        getCourseData();
    }, []);

    const getUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("user", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setUserInfo(result.userdata);
            } else {
                localStorage.removeItem("user");
            }
        }
    }

    const getCourseData = async () => {
        let result = await udc.get("courses", "", {id: Number(id)})
            .then((data) => { return data })
            .catch((data) => { return data });

        if (result.status === 200) {
            setCourseData(result.data[0]);
        } else {
            setCourseError("The course is not exist.")
        }
    }

    return (
        <>
            {
                courseError && (
                    <form>
                        <h2>Course Error</h2>
                        <p>{courseError}</p>
                    </form>
                )
            }
            {
                courseData && (
                    <>
                        <div>
                            <h2>{courseData.name}</h2>
                        </div>

                        <div>
                            <p>Course Code: {courseData.code}</p>
                            <p>Department: {courseData.department}</p>
                            <p>Program: {courseData.program}</p>
                            <p>Term: {courseData.term}</p>
                            <p>Start Date: {courseData.startDate}</p>
                            <p>End Date: {courseData.endDate}</p>
                            <p>Week Day: {courseData.weekDay}</p>
                            <p>Start Time of Day: {courseData.startTime}</p>
                            <p>End Time of Day: {courseData.endTime}</p>
                            <p>Delivery Method: {courseData.deliveryMethod}</p>
                            <p>Maximum Seats: {courseData.maxSeats}</p>
                            <p>Available Seats: {courseData.availableSeats}</p>
                            <p>Description: {courseData.description}</p>
                        </div>

                        <div>
                            {
                                JSON.parse(localStorage.getItem("user")) !== null ? (<>
                                    {
                                        userInfo.type === "admin" && (<>
                                            <div><Link to={"/student-list/" + courseData.id}>Student List of Course</Link></div>
                                            <div><Link to={"/edit-course/" + courseData.id}>Edit Course</Link></div>
                                            <div><Link to={"/delete-course/" + courseData.id}>Delete Course</Link></div>
                                        </>)
                                    }
                                    {
                                        userInfo.type === "student" && (<>
                                            <div><Link to={"/register-course/" + courseData.id}>Register Course</Link></div>
                                        </>)
                                    }
                                </>) : (<>
                                    <p>Interested in this course? <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link> to register it now!</p>
                                </>)
                            }
                        </div>
                    </>
                )
            }
        </>
    );
}

export default CourseDetailsComponent;