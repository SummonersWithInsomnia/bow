import {lsh} from "../lsh/lsh";

async function PostRegisterCourse(token, jsonObj) {
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
        let studentResult = await lsh.read("students", {id: uid})
            .then((data) => {
                return data;
            })
            .catch((data) => {
                return data;
            });

        if (studentResult.status === 200 && studentResult.data.length === 1 && studentResult.data[0].id === uid) {
            let courseResult = await lsh.read("courses", {id: query.id, deleted: false})
                .then((data) => {
                    return data;
                })
                .catch((data) => {
                    return data;
                });

            if (courseResult.status === 200 && courseResult.data.length === 1 && courseResult.data[0].id === query.id) {
                if (studentResult.data[0].department !== courseResult.data[0].department) {
                    return Promise.reject({
                        "status": 400,
                        "message": "You cannot register this course because your department doesn't match the course"
                    });
                }
                if (studentResult.data[0].program !== courseResult.data[0].program) {
                    return Promise.reject({
                        "status": 400,
                        "message": "You cannot register this course because your program doesn't match the course"
                    });
                }

                if (courseResult.data[0].availableSeats > 0) {
                    let registrationResult = await lsh.read("course-registration", {
                        course: courseResult.data[0].id,
                        student: studentResult.data[0].id,
                        deleted: false
                    })
                        .then((data) => {
                            return data;
                        })
                        .catch((data) => {
                            return data;
                        });

                    if (registrationResult.status === 200 && registrationResult.data.length === 0) {
                        let studentMaxCourses = await lsh.read("course-registration", {
                            student: studentResult.data[0].id,
                            deleted: false
                        })
                            .then((data) => {
                                return data;
                            })
                            .catch((data) => {
                                return data;
                            });

                        if (studentMaxCourses.status === 200) {
                            let maxCourses = 0;
                            switch (studentResult.data[0].program) {
                                case "Certificate (6 months)":
                                    maxCourses = 1;
                                    break;
                                case "Post-Diploma (1 year)":
                                    maxCourses = 2;
                                    break;
                                case "Diploma (2 years)":
                                    maxCourses = 3;
                                    break;
                                default:
                                    break;
                            }

                            if (studentMaxCourses.data.length < maxCourses) {
                                let registerResult = await lsh.create("course-registration", {
                                    student: studentResult.data[0].id,
                                    course: courseResult.data[0].id,
                                    deleted: false
                                }).then(data => {
                                    return data;
                                }).catch((data) => {
                                    return data;
                                });

                                courseResult.data[0].availableSeats -= 1;

                                let updateCourseResult = await lsh.update("courses", courseResult.data[0])
                                    .then((data) => {
                                        return data;
                                    })
                                    .catch((data) => {
                                        return data;
                                    });

                                if (registerResult.status === 200 && updateCourseResult.status === 200) {
                                    return Promise.resolve({
                                        "status": 200,
                                        "message": "Course Registered Successfully"
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
                                    "message": "You cannot register this course due to the maximum courses you can register"
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
                            "message": "You have already registered this course"
                        });
                    }
                } else {
                    return Promise.reject({
                        "status": 400,
                        "message": "The course is full"
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

export default PostRegisterCourse