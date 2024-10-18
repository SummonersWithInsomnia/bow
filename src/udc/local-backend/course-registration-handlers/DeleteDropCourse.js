import {lsh} from "../lsh/lsh";

async function DeleteDropCourse(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);

    if (!query.hasOwnProperty("id") || isNaN(Number(query.id))) {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }

    if (userType === "students") {
        let uid = parseInt(token.substring(7));
        let result = await lsh.read("course-registration", {id: query.id, deleted: false})
            .then((data) => {
                return data
            })
            .catch((data) => {
                return data
            });

        if (result.status === 200 && result.data.length === 1 && result.data[0].student === uid) {
            let deleteResult = await lsh.delete("course-registration", {id: query.id, deleted: false})
                .then((data) => {
                    return data
                })
                .catch((data) => {
                    return data
                });

            if (deleteResult.status === 200) {
                let courseResult = await lsh.read("courses", {id: result.data[0].course, deleted: false})
                    .then((data) => {
                        return data
                    })
                    .catch((data) => {
                        return data
                    });

                if (courseResult.status === 200 && courseResult.data[0].id === result.data[0].course) {
                    let course = courseResult.data[0];

                    course.availableSeats = course.availableSeats + 1;

                    let updateResult = await lsh.update("courses", course)
                        .then((data) => {
                            return data
                        })
                        .catch((data) => {
                            return data
                        });

                    if (updateResult.status === 200) {
                        return Promise.resolve({
                            "status": 200,
                            "message": "Course Dropped Successfully"
                        });

                    } else {
                        // Cleanup when it doesn't work
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

export default DeleteDropCourse