import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import StudentComponent from "./Student.component";

function StudentListByCourseComponent({id}) {
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState(null);

    const [courseError, setCourseError] = useState("");

    useEffect(() => {
        getUserInfo();
        getData();
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
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    }

    const getData = async () => {
        let result = await udc.get("student-list-by-course", JSON.parse(localStorage.getItem("user")).token, { id: Number(id) })
            .then((data) => { return data; })
            .catch((data) => { return data; });

        try {
            if (result.status === 200) {
                setData(result.data);
                console.log(result.data);
            } else {
                setCourseError("The course is not exist.")
            }
        } catch (error) {}
    }

    return (
        <>
            {
                JSON.parse(localStorage.getItem("user")) ? (
                    <>
                        {
                            userInfo.type === "admin" ? (
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
                                        (data !== null) &&
                                        <>
                                            <div>
                                                <h2>Student List by Course</h2>

                                            </div>

                                            <div>
                                                <h3>Course Basic Information</h3>
                                                <p>Name: {data["course"].name}</p>
                                                <p>Code: {data["course"].code}</p>
                                                <p>Department: {data["course"].department}</p>
                                                <p>Program: {data["course"].program}</p>
                                                <p>Term: {data["course"].term}</p>
                                                <p>Start Date: {data["course"].startDate}</p>
                                                <p>End Date: {data["course"].endDate}</p>
                                                <p>Week Day: {data["course"].weekDay}</p>
                                                <p>Start Time of Day: {data["course"].startTime}</p>
                                                <p>End Time of Day: {data["course"].endTime}</p>
                                                <p>Max Seats: {data["course"].maxSeats}</p>
                                                <p>Available Seats: {data["course"].availableSeats}</p>
                                            </div>

                                            <div>
                                                <h3>Student List</h3>
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <th>Student ID</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>Phone Country Code</th>
                                                        <th>Phone Number</th>
                                                        <th>Department</th>
                                                        <th>Program</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <StudentComponent students={data["students"]}/>
                                                    </tbody>
                                                </table>
                                                {data["students"].length === 0 && <p>No Students</p>}
                                            </div>
                                        </>
                                    }
                                </>
                            ) : (
                                <>
                                    <form>
                                        <h2>Student List by Course</h2>
                                        <p>This function is only available for admins.</p>
                                    </form>
                                </>
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

export default StudentListByCourseComponent;