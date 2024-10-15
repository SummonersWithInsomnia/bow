import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import MyCourseComponent from "./MyCourse.component";

function MyCoursesComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [maxCourses, setMaxCourses] = useState(0);
    const [myCourses, setMyCourses] = useState([]);

    const [maxCourseMessage, setMaxCourseMessage] = useState("");

    useEffect(() => {
        getUserInfo();
        getMyCourses();
    }, []);

    useEffect(() => {
        setMaxCourseMessage("Your courses / Program Limit: " + myCourses.length + " / " + maxCourses);
    }, [myCourses, maxCourses]);

    const getMyCourses = async () => {
        let result = await udc.get("my-courses", JSON.parse(localStorage.getItem("user")).token, {})
            .then((data) => { return data; })
            .catch((data) => { return data; });

        if (result.status === 200) {
            setMyCourses(result.data);
        }
    }

    const getUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("user")) !== null) {
            let result = await udc.get("user", JSON.parse(localStorage.getItem("user")).token, {})
                .then((data) => { return data; })
                .catch((data) => { return data; });

            if (result.status === 200) {
                setUserInfo(result.userdata);

                if (result.userdata.type === "student") {
                    switch (result.userdata.program) {
                        case "Certificate (6 months)":
                            setMaxCourses(1);
                            break;
                        case "Post-Diploma (1 year)":
                            setMaxCourses(2);
                            break;
                        case "Diploma (2 years)":
                            setMaxCourses(3);
                            break;
                        default:
                            break;
                    }
                }

            } else {
                localStorage.removeItem("user");
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    }

    return (
        <>
            {
                JSON.parse(localStorage.getItem("user")) ? (
                    <>
                        {
                            userInfo.type === "student" ? (
                                <>
                                    <h2>My Courses</h2>
                                    <p>{maxCourseMessage}</p>

                                    <div>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Course Name</th>
                                                <th>Course Code</th>
                                                <th>Department</th>
                                                <th>Program</th>
                                                <th>Term</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Week Day</th>
                                                <th>Start Time of Day</th>
                                                <th>End Time of Day</th>
                                                <th>Delivery Method</th>
                                                <th>Available Seats</th>
                                                <th>Drop</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <MyCourseComponent courses={myCourses}/>
                                            </tbody>
                                        </table>
                                        {myCourses.length === 0 && <p>No Data</p>}
                                    </div>
                                </>
                            ) : (
                                <form>
                                    <h2>My Courses</h2>
                                    <p>This function is only available for students.</p>
                                </form>
                            )
                        }
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default MyCoursesComponent