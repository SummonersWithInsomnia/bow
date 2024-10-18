import {lsh} from "../lsh/lsh";

async function PostCreateCourse(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);

    if (!query.hasOwnProperty("name") ||
        !query.hasOwnProperty("code") ||
        !query.hasOwnProperty("description") ||
        !query.hasOwnProperty("department") ||
        !query.hasOwnProperty("program") ||
        !query.hasOwnProperty("term") ||
        !query.hasOwnProperty("startDate") ||
        !query.hasOwnProperty("endDate") ||
        !query.hasOwnProperty("weekDay") ||
        !query.hasOwnProperty("startTime") ||
        !query.hasOwnProperty("endTime") ||
        !query.hasOwnProperty("campus") ||
        !query.hasOwnProperty("deliveryMethod") ||
        !query.hasOwnProperty("maxSeats")
    ) {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }

    if (userType === "admins") {
        let uid = parseInt(token.substring(5));

        let result = await lsh.read("admins", {id: uid})
            .then((data) => {
                return data;
            });
        if (result.status === 200 && result.data.length === 1 && result.data[0].id === uid) {
            let newCourse = query;
            newCourse.availableSeats = newCourse.maxSeats;
            newCourse.deleted = false;

            let createNewCourseResult = await lsh.create("courses", newCourse)
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (createNewCourseResult.status === 200) {
                return Promise.resolve({
                    "status": 200,
                    "message": "Course is Created Successfully"
                });
            } else {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            }
        } else {
            return Promise.reject({
                "status": 400,
                "message": "Bad Request"
            });
        }
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default PostCreateCourse;