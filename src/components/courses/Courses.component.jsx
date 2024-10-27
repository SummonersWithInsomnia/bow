import {useEffect, useState} from "react";
import {udc} from "../../udc/udc";
import CourseComponent from "./Course.component";
import SearchBoxComponent from "../tools/SearchBox.component";
import DropdownFilterComponent from "../tools/DropdownFilter.component";

function CoursesComponent() {
    const [courseData, setCourseData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        name: "",
        code: "",
        department: "",
        program: "",
        term: ""
    });

    useEffect(() => {
        getCourseData();
    }, []);


    const getCourseData = async () => {
        let result = await udc.get("courses", "", {})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (result.status === 200) {
            setCourseData(result.data);
        }
    }

    const onSearchCourseNameOrCodeChange = (e) => {
        setSearchQuery({
            ...searchQuery,
            "name": e.target.value,
            "code": e.target.value
        });
    };

    const onDepartmentChange = (e) => {
        setSearchQuery({
            ...searchQuery,
            "department": e.target.value
        });
    };

    const onProgramChange = (e) => {
        setSearchQuery({
            ...searchQuery,
            "program": e.target.value
        });
    };

    const onTermChange = (e) => {
        setSearchQuery({
            ...searchQuery,
            "term": e.target.value
        });
    };

    useEffect(() => {
        getSearchCourseData(searchQuery);
    }, [searchQuery]);

    const getSearchCourseData = async (searchQuery) => {
        let result = await udc.post("courses", "", searchQuery)
            .then((data) => {
                return data;
            })
            .catch((data) => {
                return data;
            });

        if (result.status === 200) {
            setCourseData(result.data);
        }
    };

    return (
        <>
            <div>
                <h2>Courses</h2>
            </div>

            <div>
                <SearchBoxComponent placeholder={"Course Name or Code..."}
                                    onChangeHandler={onSearchCourseNameOrCodeChange}/>
                <DropdownFilterComponent friendlyName="Department" options={["Software Development"]}
                                         onChangeHandler={onDepartmentChange}/>
                <DropdownFilterComponent friendlyName="Program"
                                         options={["Certificate (6 months)", "Post-Diploma (1 year)", "Diploma (2 years)"]}
                                         onChangeHandler={onProgramChange}/>
                <DropdownFilterComponent friendlyName="Term" options={["Fall", "Winter", "Spring", "Summer"]}
                                         onChangeHandler={onTermChange}/>
            </div>

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
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    <CourseComponent courses={courseData}></CourseComponent>
                    </tbody>
                </table>
                {courseData.length === 0 && <p>No Data</p>}
            </div>
        </>
    );
}

export default CoursesComponent;