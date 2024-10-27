import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE, USER_LOGGED_IN_ENTRANCE} from "../../App.config";
import {Link} from "react-router-dom";

function EditCourseComponent({id}) {
    const [userInfo, setUserInfo] = useState({});
    const [courseData, setCourseData] = useState({});
    const [courseError, setCourseError] = useState("");
    const [minSeats, setMinSeats] = useState(0);

    const [editCourseMessage, setEditCourseMessage] = useState("");

    const [nameTip, setNameTip] = useState("");
    const [codeTip, setCodeTip] = useState("");
    const [descriptionTip, setDescriptionTip] = useState("");
    const [endDateTip, setEndDateTip] = useState("");
    const [endTimeTip, setEndTimeTip] = useState("");
    const [maxSeatsTip, setMaxSeatsTip] = useState("");

    useEffect(() => {
        getUserInfo();
        getCourseData();
    }, []);

    useEffect(() => {

        if (!isValidEndDate()) {
            setEndDateTip("End date cannot be earlier than start date.");
        } else {
            setEndDateTip("");
        }

        if (!isValidEndTime()) {
            setEndTimeTip("End time cannot be earlier than start time.");
        } else {
            setEndTimeTip("");
        }

        if (!isValidMaxSeats()) {
            setMaxSeatsTip("Max seats cannot be smaller than the number of registered students (" + minSeats + ").");
        } else {
            setMaxSeatsTip("");
        }

    }, [courseData]);

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
            setMinSeats(result.data[0].maxSeats - result.data[0].availableSeats);
        } else {
            setCourseError("The course does not exist.")
        }
    }

    function isValidMaxSeats() {
        return courseData.maxSeats >= minSeats;
    }

    function isValidCourseCode(code) {
        const regex = /^([A-Z]+)([0-9]+)$/;
        return regex.test(code);
    }

    function isValidEndDate() {
        if (courseData.startDate === "" || courseData.endDate === "") return true;

        return courseData.endDate >= courseData.startDate;
    }

    function isValidEndTime() {
        if (courseData.startTime === "" || courseData.endTime === "") return true;

        return courseData.endTime >= courseData.startTime;
    }

    const handleCourseFormChange = (e) => {
        switch (e.target.name) {
            case "tbName":
                if (e.target.value.length === 0) {
                    setNameTip("Course name cannot be empty.");
                } else {
                    setNameTip("");
                }
                setCourseData({
                    ...courseData,
                    ["name"]: e.target.value
                });
                break;

            case "tbCode":
                if (!isValidCourseCode(e.target.value)) {
                    setCodeTip("Course code should start with uppercase letters and end with numbers.");
                } else {
                    setCodeTip("");
                }
                setCourseData({
                    ...courseData,
                    ["code"]: e.target.value
                });
                break;

            case "tbDepartment":
                setCourseData({
                    ...courseData,
                    ["department"]: e.target.value
                });
                break;

            case "tbProgram":
                setCourseData({
                    ...courseData,
                    ["program"]: e.target.value
                });
                break;

            case "tbTerm":
                setCourseData({
                    ...courseData,
                    ["term"]: e.target.value
                });
                break;

            case "tbWeekDay":
                setCourseData({
                    ...courseData,
                    ["weekDay"]: e.target.value
                });
                break;

            case "tbCampus":
                setCourseData({
                    ...courseData,
                    ["campus"]: e.target.value
                });
                break;

            case "tbDeliveryMethod":
                setCourseData({
                    ...courseData,
                    ["deliveryMethod"]: e.target.value
                });
                break;

            case "tbMaxSeats":
                setCourseData({
                    ...courseData,
                    ["maxSeats"]: Number(e.target.value)
                });
                break;

            case "tbDescription":
                if (e.target.value.length === 0) {
                    setDescriptionTip("Description cannot be empty.");
                } else {
                    setDescriptionTip("");
                }
                setCourseData({
                    ...courseData,
                    ["description"]: e.target.value
                });
                break;

            case "tbStartDate":
                setCourseData({
                    ...courseData,
                    ["startDate"]: e.target.value
                });
                break;

            case "tbEndDate":
                setCourseData({
                    ...courseData,
                    ["endDate"]: e.target.value
                });
                break;

            case "tbStartTime":
                setCourseData({
                    ...courseData,
                    ["startTime"]: e.target.value
                });
                break;

            case "tbEndTime":
                setCourseData({
                    ...courseData,
                    ["endTime"]: e.target.value
                });
                break;

            default:
                break;
        }
    };

    const handleEditCourse = async (e) => {
        e.preventDefault();
        setEditCourseMessage("Editing...");

        courseData.availableSeats = courseData.maxSeats - minSeats;

        if (nameTip === "" && codeTip === "" && descriptionTip === "" && endDateTip === "" && endTimeTip === "" && maxSeatsTip === "") {
            let result = await udc.put("course", JSON.parse(localStorage.getItem("user")).token, courseData)
                .then((data) => {
                    return data
                })
                .catch((data) => {
                    return data
                });

            if (result.status === 200) {
                setEditCourseMessage(result.message);
                setTimeout(() => {
                    window.location.href = USER_LOGGED_IN_ENTRANCE
                }, 3000);
            } else {
                setEditCourseMessage(result.message);
                setTimeout(() => {
                    setEditCourseMessage("")
                }, 3000);
            }
        } else {
            setEditCourseMessage("");
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
                                        <form onSubmit={handleEditCourse}>
                                            <div>
                                                <h2>Edit Course</h2>
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="tbName"
                                                    placeholder="Course Name"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.name}
                                                />
                                                {nameTip && <p>{nameTip}</p>}
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="tbCode"
                                                    placeholder="Course Code"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.code}
                                                />
                                                {codeTip && <p>{codeTip}</p>}
                                            </div>

                                            <div>
                                                <label>Department</label>
                                                <select
                                                    name="tbDepartment"
                                                    required
                                                    defaultValue={courseData.department}
                                                    onChange={handleCourseFormChange}
                                                >
                                                    <option value="Software Development">Software Development</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Program</label>
                                                <select
                                                    name="tbProgram"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.program}
                                                >
                                                    <option value="Certificate (6 months)">Certificate (6 months)
                                                    </option>
                                                    <option value="Post-Diploma (1 year)">Post-Diploma (1 year)</option>
                                                    <option value="Diploma (2 years)">Diploma (2 years)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Term</label>
                                                <select
                                                    name="tbTerm"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.term}
                                                >
                                                    <option value="Fall">Fall</option>
                                                    <option value="Winter">Winter</option>
                                                    <option value="Spring">Spring</option>
                                                    <option value="Summer">Summer</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Start Date</label>
                                                <input
                                                    type="date"
                                                    name="tbStartDate"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.startDate}
                                                />
                                            </div>

                                            <div>
                                                <label>End Date</label>
                                                <input
                                                    type="date"
                                                    name="tbEndDate"
                                                    required
                                                    onChange={handleCourseFormChange}
                                                    defaultValue={courseData.endDate}
                                                />
                                                {endDateTip && <p>{endDateTip}</p>}
                                            </div>

                                            <div>
                                                <label>Week Day</label>
                                                <select
                                                    name="tbWeekDay"
                                                    required
                                                    defaultValue={courseData.weekDay}
                                                    onChange={handleCourseFormChange}
                                                >
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                    <option value="Friday">Friday</option>
                                                    <option value="Saturday">Saturday</option>
                                                    <option value="Sunday">Sunday</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Start Time of Day</label>
                                                <input
                                                    type="time"
                                                    name="tbStartTime"
                                                    required
                                                    defaultValue={courseData.startTime}
                                                    onChange={handleCourseFormChange}
                                                />
                                            </div>

                                            <div>
                                                <label>End Time of Day</label>
                                                <input
                                                    type="time"
                                                    name="tbEndTime"
                                                    required
                                                    defaultValue={courseData.endTime}
                                                    onChange={handleCourseFormChange}
                                                />
                                                {endTimeTip && <p>{endTimeTip}</p>}
                                            </div>

                                            <div>
                                                <label>Campus</label>
                                                <select
                                                    name="tbCampus"
                                                    required
                                                    defaultValue={courseData.campus}
                                                    onChange={handleCourseFormChange}
                                                >
                                                    <option value="Calgary - Main Campus">Calgary - Main Campus</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Delivery Method</label>
                                                <select
                                                    name="tbDeliveryMethod"
                                                    required
                                                    defaultValue={courseData.deliveryMethod}
                                                    onChange={handleCourseFormChange}
                                                >
                                                    <option value="Real-time In-person">Real-time In-person</option>
                                                    <option value="Real-time Online">Real-time Online</option>
                                                    <option value="Anytime Online">Anytime Online</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label>Maximum Seats</label>
                                                <input
                                                    type="number"
                                                    name="tbMaxSeats"
                                                    defaultValue={courseData.maxSeats}
                                                    min={0}
                                                    required
                                                    onChange={handleCourseFormChange}
                                                />
                                                {maxSeatsTip && <p>{maxSeatsTip}</p>}
                                            </div>

                                            <div>
                                                 <textarea
                                                     name="tbDescription"
                                                     placeholder="Description"
                                                     required
                                                     defaultValue={courseData.description}
                                                     onChange={handleCourseFormChange}
                                                 />
                                                {descriptionTip && <p>{descriptionTip}</p>}
                                            </div>

                                            <div>
                                                {editCourseMessage && <p>{editCourseMessage}</p>}
                                            </div>

                                            <div>
                                                <br/>
                                                <button type="submit" name="btnSubmit">Edit Course</button>
                                            </div>

                                            <div>
                                                <br />
                                                <Link to={"/course-details/" + courseData.id}>Back to Course Details</Link>
                                            </div>
                                        </form>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <form>
                            <h2>Edit Course</h2>
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

export default EditCourseComponent;