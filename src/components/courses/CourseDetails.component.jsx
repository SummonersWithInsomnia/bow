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
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (result.status === 200) {
                setUserInfo(result.userdata);
            } else {
                localStorage.removeItem("user");
            }
        }
    }

    const getCourseData = async () => {
        let result = await udc.post("courses", "", {id: Number(id)})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (result.status === 200 && result.data.length > 0) {
            setCourseData(result.data[0]);
        } else {
            setCourseError("The course does not exist.")
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
                Object.keys(courseData).length > 0 && (
                    <>
                        <div>
                            <h2>{courseData.name}</h2>
                        </div>

                        <div className="courseDetails">
                            <p><span>Course Code:</span> {courseData.code}</p>
                            <p><span>Department:</span> {courseData.department}</p>
                            <p><span>Program:</span> {courseData.program}</p>
                            <p><span>Term:</span> {courseData.term}</p>
                            <p><span>Start Date:</span> {courseData.startDate}</p>
                            <p><span>End Date:</span> {courseData.endDate}</p>
                            <p><span>Week Day:</span> {courseData.weekDay}</p>
                            <p><span>Start Time of Day:</span> {courseData.startTime}</p>
                            <p><span>End Time of Day:</span> {courseData.endTime}</p>
                            <p><span>Delivery Method:</span> {courseData.deliveryMethod}</p>
                            <p><span>Maximum Seats:</span> {courseData.maxSeats}</p>
                            <p><span>Available Seats:</span> {courseData.availableSeats}</p>
                            <p><span>Description:</span> {courseData.description}</p>
                        </div>

                        <div>
                            {
                                JSON.parse(localStorage.getItem("user")) !== null ? (<>
                                    {
                                        userInfo.type === "admin" && (<>
                                            <br/>
                                            <div className="regLink"><Link to={"/student-list/" + courseData.id}>Student
                                                List of Course</Link></div>
                                            <div className="regLink"><Link to={"/edit-course/" + courseData.id}>Edit
                                                Course</Link></div>
                                            <div className="regLink"><Link to={"/delete-course/" + courseData.id}>Delete
                                                Course</Link></div>
                                        </>)
                                    }
                                    {
                                        userInfo.type === "student" && (<>
                                            <br/>
                                            <div className="regLink"><Link to={"/register-course/" + courseData.id}>Register Course</Link></div>
                                        </>)
                                    }
                                </>) : (<div className="regLink">
                                    <br/>
                                    <p>Interested in this course? <Link to="/login">Log in</Link> or <Link to="/signup">Sign
                                        up</Link> to register it now!</p>
                                </div>)
                            }
                        </div>
                    </>
                )
            }
        </>
    );
}

export default CourseDetailsComponent;