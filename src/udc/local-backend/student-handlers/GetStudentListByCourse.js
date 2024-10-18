import {lsh} from "../lsh/lsh";

async function GetStudentListByCourse(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);

    if (!query.hasOwnProperty("id")) {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }

    if (userType === "admins") {
        let courseResult = await lsh.read("courses", {id: Number(query.id), deleted: false})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (courseResult.status === 200 && courseResult.data[0].id === Number(query.id)) {
            let registrationResult = await lsh.read("course-registration", {
                deleted: false,
                course: Number(query.id)
            }).then(data => {
                return data;
            })
                .catch((data) => {
                    return data
                });

            if (registrationResult.status === 200) {
                let studentData = [];

                for (let i = 0; i < registrationResult.data.length; i++) {
                    studentData.push(await lsh.read("students", {id: registrationResult.data[i].student})
                        .then((result) => {
                            return result.data[0]
                        }));
                }

                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "data": {
                        "course": courseResult.data[0],
                        "students": studentData
                    }
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

export default GetStudentListByCourse