import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import CourseComponent from "./Course.component";
import SearchBoxComponent from "../tools/SearchBox.component";
import DropdownFilterComponent from "../tools/DropdownFilter.component";

function CourseManagementComponent() {
    const [userInfo, setUserInfo] = useState({});
    const [courseData, setCourseData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        name: "",
        code: "",
        department: "",
        program: "",
        term: ""
    });

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
                window.location.href = GUEST_ENTRANCE;
            }
        } else {
            window.location.href = GUEST_ENTRANCE;
        }
    }

    const getCourseData = async () => {
        let result = await udc.get("courses", "", {})
            .then((data) => { return data })
            .catch((data) => { return data });

        if (result.status === 200) {
            setCourseData(result.data);
        }
    }

    const onSearchCourseNameOrCodeChange = (e) => {
        setSearchQuery({...searchQuery,
            "name": e.target.value,
            "code": e.target.value
        });
    };
    const onDepartmentChange = (e) => {
        setSearchQuery({...searchQuery,
            "department": e.target.value
        });
    };

    const onProgramChange = (e) => {
        setSearchQuery({...searchQuery,
            "program": e.target.value
        });
    };

    const onTermChange = (e) => {
        setSearchQuery({...searchQuery,
            "term": e.target.value
        });
    };

    useEffect(() => {
        getSearchCourseData(searchQuery);
    }, [searchQuery]);

    const getSearchCourseData = async (searchQuery) => {
        let result = await udc.get("courses", JSON.parse(localStorage.getItem("user")).token, searchQuery)
            .then((data) => { return data; })
            .catch((data) => { return data; });

        if (result.status === 200) {
            setCourseData(result.data);
        }
    };

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "admin" ? (
                        <>
                            <div>
                                <h2>Course Management</h2>
                            </div>
                            <div>
                                <SearchBoxComponent placeholder={"Course Name or Code..."} onChangeHandler={onSearchCourseNameOrCodeChange} />
                                <DropdownFilterComponent friendlyName="Department" options={["Software Development"]} onChangeHandler={onDepartmentChange} />
                                <DropdownFilterComponent friendlyName="Program" options={["Certificate (6 months)", "Post-Diploma (1 year)", "Diploma (2 years)"]} onChangeHandler={onProgramChange} />
                                <DropdownFilterComponent friendlyName="Term" options={["Fall", "Winter", "Spring", "Summer"]} onChangeHandler={onTermChange} />
                            </div>
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Course ID</th>
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
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        courseData.length !== 0 &&
                                        <CourseComponent courses={courseData}></CourseComponent>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <form>
                            <h2>Course Management</h2>
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

export default CourseManagementComponent;