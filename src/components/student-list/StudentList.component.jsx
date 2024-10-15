import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import {GUEST_ENTRANCE} from "../../App.config";
import StudentComponent from "./Student.component";
import DropdownFilterComponent from "../tools/DropdownFilter.component";
import SearchBoxComponent from "../tools/SearchBox.component";

function StudentListComponent() {
    const [studentData, setStudentData] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        firstName: "",
        lastName: "",
        department: "",
        program: "",
        email: ""
    });

    useEffect(() => {
        getUserInfo();
        getSearchStudentData({});
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

    useEffect(() => {
        getSearchStudentData(searchQuery);
    }, [searchQuery]);

    const getSearchStudentData = async (searchQuery) => {
        let result = await udc.get("student-list", JSON.parse(localStorage.getItem("user")).token, searchQuery)
            .then((data) => { return data; })
            .catch((data) => { return data; });

        try {
            if (result.status === 200) {
                setStudentData(result.data);
            }
        } catch (error) {}

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

    const onFirstNameChange = (e) => {
        setSearchQuery({...searchQuery,
            "firstName": e.target.value
        });
    };

    const onLastNameChange = (e) => {
        setSearchQuery({...searchQuery,
            "lastName": e.target.value
        });
    };

    const onEmailChange = (e) => {
        setSearchQuery({...searchQuery,
            "email": e.target.value
        });
    };

    return (
        <>
            {JSON.parse(localStorage.getItem("user")) ? (
                <>
                    {userInfo.type === "admin" ? (
                        <>
                            <div>
                                <h2>Student List</h2>
                            </div>

                            <div>
                                <SearchBoxComponent placeholder={"First Name"} onChangeHandler={onFirstNameChange} />
                                <SearchBoxComponent placeholder={"Last Name"} onChangeHandler={onLastNameChange} />
                                <SearchBoxComponent placeholder={"Email"} onChangeHandler={onEmailChange} />
                                <DropdownFilterComponent friendlyName="Department" options={["Software Development"]} onChangeHandler={onDepartmentChange} />
                                <DropdownFilterComponent friendlyName="Program" options={["Certificate (6 months)", "Post-Diploma (1 year)", "Diploma (2 years)"]} onChangeHandler={onProgramChange} />
                            </div>

                            <div>
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
                                    <StudentComponent students={studentData} />
                                    </tbody>
                                </table>
                                {studentData.length === 0 && <p>No Data</p>}
                            </div>
                        </>

                    ) : (
                        <>
                            <form>
                                <h2>Student List</h2>
                                <p>This function is only available for admins.</p>
                            </form>
                        </>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default StudentListComponent;