import {lsh} from "../lsh/lsh";

async function DeleteCourse(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);
    if (!query.hasOwnProperty("id") ||
        !Number.isInteger(Number(query["id"])) ||
        Number(query["id"]) < 0
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
            let deleteCourseRegistrationResult = await lsh.deleteMultiple("course-registration", {
                fk: "course",
                fkValue: Number(query.id)
            })
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });
            let deleteCourseResult = await lsh.delete("courses", {id: Number(query.id)})
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (deleteCourseResult.status === 200 && deleteCourseRegistrationResult.status === 200) {
                return Promise.resolve({
                    "status": 200,
                    "message": "Course Deleted"
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

export default DeleteCourse;