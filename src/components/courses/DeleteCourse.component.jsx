import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE, USER_LOGGED_IN_ENTRANCE} from "../../App.config";
import {Link} from "react-router-dom";

function DeleteCourseComponent({id}) {
    const [userInfo, setUserInfo] = useState({});
    const [courseData, setCourseData] = useState({});
    const [courseError, setCourseError] = useState("");
    const [deleteCourseMessage, setDeleteCourseMessage] = useState("");

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
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
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

        if (result.status === 200) {
            setCourseData(result.data[0]);
        } else {
            setCourseError("The course does not exist.")
        }
    }

    const deleteCourseHandler = async (e) => {
        e.preventDefault();
        let result = await udc.delete("course", JSON.parse(localStorage.getItem("user")).token, {id: Number(id)})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data;
            });

        if (result.status === 200) {
            setDeleteCourseMessage(result.message);
            setTimeout(() => {
                window.location.href = USER_LOGGED_IN_ENTRANCE
            }, 3000);
        } else {
            setDeleteCourseMessage(result.message);
            setTimeout(() => {
                setDeleteCourseMessage("")
            }, 3000);
        }
    };

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "admin" ? (
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
                                            <h2>Delete Course</h2>
                                        </div>

                                        <div className="courseDetails">
                                            <h3>Are you sure to delete the following course?</h3>
                                            <p>Course Name: {courseData.name}</p>
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
                                            {deleteCourseMessage && <p>{deleteCourseMessage}</p>}
                                        </div>

                                        <div>
                                            <br/>
                                            <div>
                                                <button className="deleteButton" onClick={deleteCourseHandler}>Delete
                                                </button>
                                            </div>
                                            <br/>
                                            <div className="regLink">
                                                <Link to={"/course-details/" + courseData.id}>Back to Course
                                                    Details</Link>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <form>
                            <h2>Delete Course</h2>
                            <p>This function is only available for admins.</p>
                        </form>
                    )}
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default DeleteCourseComponent;