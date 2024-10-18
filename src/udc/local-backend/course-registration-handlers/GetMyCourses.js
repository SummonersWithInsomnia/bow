import {lsh} from "../lsh/lsh";

async function GetMyCourses(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";

    if (userType === "students") {
        let uid = parseInt(token.substring(7));

        let result = await lsh.read("course-registration", {student: uid, deleted: false})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (result.status === 200 && result.data.length !== 0) {
            let myCourses = [];

            for (let i = 0; i < result.data.length; i++) {
                let course = await lsh.read("courses", {id: result.data[i].course, deleted: false})
                    .then((data) => {
                        return data.data[0]
                    });
                course.registrationId = result.data[i].id;
                myCourses.push(course);
            }

            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "data": myCourses
            });

        } else {
            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "data": []
            });
        }
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default GetMyCourses