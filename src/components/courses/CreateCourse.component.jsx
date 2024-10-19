import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE, USER_LOGGED_IN_ENTRANCE} from "../../App.config";
import {useEffect, useState} from "react";

function CreateCourseComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [newCourseData, setNewCourseData] = useState({
        department: "Software Development",
        program: "Certificate (6 months)",
        term: "Fall",
        weekDay: "Monday",
        campus: "Calgary - Main Campus",
        deliveryMethod: "Real-time In-person",
        maxSeats: 40,
        startDate: new Date().toISOString().substring(0, 10),
        endDate: "",
        startTime: "",
        endTime: ""
    });

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

    }, [newCourseData]);

    const [createCourseMessage, setCreateCourseMessage] = useState("");

    const [nameTip, setNameTip] = useState("");
    const [codeTip, setCodeTip] = useState("");
    const [descriptionTip, setDescriptionTip] = useState("");
    const [endDateTip, setEndDateTip] = useState("");
    const [endTimeTip, setEndTimeTip] = useState("");

    useEffect(() => {
        getUserInfo();
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

    function isValidCourseCode(code) {
        const regex = /^([A-Z]+)([0-9]+)$/;
        return regex.test(code);
    }

    function isValidEndDate() {
        if (newCourseData.startDate === "" || newCourseData.endDate === "") return true;

        return newCourseData.endDate >= newCourseData.startDate;
    }

    function isValidEndTime() {
        if (newCourseData.startTime === "" || newCourseData.endTime === "") return true;

        return newCourseData.endTime >= newCourseData.startTime;
    }

    const handleCourseFormChange = (e) => {
        switch (e.target.name) {
            case "tbName":
                if (e.target.value.length === 0) {
                    setNameTip("Course name cannot be empty.");
                } else {
                    setNameTip("");
                }
                setNewCourseData({
                    ...newCourseData,
                    ["name"]: e.target.value
                });
                break;

            case "tbCode":
                if (!isValidCourseCode(e.target.value)) {
                    setCodeTip("Course code should start with uppercase letters and end with numbers.");
                } else {
                    setCodeTip("");
                }
                setNewCourseData({
                    ...newCourseData,
                    ["code"]: e.target.value
                });
                break;

            case "tbDepartment":
                setNewCourseData({
                    ...newCourseData,
                    ["department"]: e.target.value
                });
                break;

            case "tbProgram":
                setNewCourseData({
                    ...newCourseData,
                    ["program"]: e.target.value
                });
                break;

            case "tbTerm":
                setNewCourseData({
                    ...newCourseData,
                    ["term"]: e.target.value
                });
                break;

            case "tbWeekDay":
                setNewCourseData({
                    ...newCourseData,
                    ["weekDay"]: e.target.value
                });
                break;

            case "tbCampus":
                setNewCourseData({
                    ...newCourseData,
                    ["campus"]: e.target.value
                });
                break;

            case "tbDeliveryMethod":
                setNewCourseData({
                    ...newCourseData,
                    ["deliveryMethod"]: e.target.value
                });
                break;

            case "tbMaxSeats":
                setNewCourseData({
                    ...newCourseData,
                    ["maxSeats"]: e.target.value
                });
                break;

            case "tbDescription":
                if (e.target.value.length === 0) {
                    setDescriptionTip("Description cannot be empty.");
                } else {
                    setDescriptionTip("");
                }
                setNewCourseData({
                    ...newCourseData,
                    ["description"]: e.target.value
                });
                break;

            case "tbStartDate":
                setNewCourseData({
                    ...newCourseData,
                    ["startDate"]: e.target.value
                });
                break;

            case "tbEndDate":
                setNewCourseData({
                    ...newCourseData,
                    ["endDate"]: e.target.value
                });
                break;

            case "tbStartTime":
                setNewCourseData({
                    ...newCourseData,
                    ["startTime"]: e.target.value
                });
                break;

            case "tbEndTime":
                setNewCourseData({
                    ...newCourseData,
                    ["endTime"]: e.target.value
                });
                break;

            default:
                break;
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setCreateCourseMessage("Creating...");

        if (nameTip === "" && codeTip === "" && descriptionTip === "" && endDateTip === "" && endTimeTip === "") {
            let result = await udc.post("create-course", JSON.parse(localStorage.getItem("user")).token, newCourseData)
                .then((data) => {
                    return data
                })
                .catch((data) => {
                    return data
                });

            if (result.status === 200) {
                setCreateCourseMessage(result.message);
                setTimeout(() => {
                    window.location.href = USER_LOGGED_IN_ENTRANCE
                }, 3000);
            } else {
                setCreateCourseMessage(result.message);
                setTimeout(() => {
                    setCreateCourseMessage("")
                }, 3000);
            }
        }
    };

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "admin" ? (
                        <form className="createCourse" onSubmit={handleCreateCourse}>
                            <div>
                                <h2>Create Course</h2>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="tbName"
                                    placeholder="Course Name"
                                    required
                                    onChange={handleCourseFormChange}
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
                                />
                                {codeTip && <p>{codeTip}</p>}
                            </div>

                            <div>
                                <label>Department</label>
                                <select
                                    name="tbDepartment"
                                    required
                                    defaultValue="Software Development"
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
                                    defaultValue="Certificate (6 months)"
                                    onChange={handleCourseFormChange}
                                >
                                    <option value="Certificate (6 months)">Certificate (6 months)</option>
                                    <option value="Post-Diploma (1 year)">Post-Diploma (1 year)</option>
                                    <option value="Diploma (2 years)">Diploma (2 years)</option>
                                </select>
                            </div>

                            <div>
                                <label>Term</label>
                                <select
                                    name="tbTerm"
                                    required
                                    defaultValue="Fall"
                                    onChange={handleCourseFormChange}
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
                                    defaultValue={new Date().toISOString().substring(0, 10)}
                                />
                            </div>

                            <div>
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="tbEndDate"
                                    required
                                    onChange={handleCourseFormChange}
                                />
                                {endDateTip && <p>{endDateTip}</p>}
                            </div>

                            <div>
                                <label>Week Day</label>
                                <select
                                    name="tbWeekDay"
                                    required
                                    defaultValue="Monday"
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
                                    onChange={handleCourseFormChange}
                                />
                            </div>

                            <div>
                                <label>End Time of Day</label>
                                <input
                                    type="time"
                                    name="tbEndTime"
                                    required
                                    onChange={handleCourseFormChange}
                                />
                                {endTimeTip && <p>{endTimeTip}</p>}
                            </div>

                            <div>
                                <label>Campus</label>
                                <select
                                    name="tbCampus"
                                    required
                                    defaultValue="Calgary - Main Campus"
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
                                    defaultValue="Real-time In-person"
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
                                    defaultValue={40}
                                    min={0}
                                    required
                                    onChange={handleCourseFormChange}
                                />
                            </div>

                            <div>
                                <textarea
                                    name="tbDescription"
                                    placeholder="Description"
                                    required
                                    onChange={handleCourseFormChange}
                                />
                                {descriptionTip && <p>{descriptionTip}</p>}
                            </div>

                            <div>
                                <p>{createCourseMessage}</p>
                            </div>

                            <div>
                                <button type="submit" name="btnSubmit">Create Course</button>
                            </div>

                        </form>
                    ) : (
                        <form>
                            <h2>Create Course</h2>
                            <p>This function is only available for admins.</p>
                        </form>
                    )}
                </>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default CreateCourseComponent;