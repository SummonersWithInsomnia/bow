import {lsh} from "../lsh/lsh";

async function PostSearchStudentList(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);

    if (userType === "admins") {
        if (Object.keys(query).length === 0) {
            let studentDataResult = await lsh.read("students", {})
                .then((data) => {
                    return data
                })
                .catch((data) => {
                    return data
                });

            if (studentDataResult.status === 200) {
                let studentData = studentDataResult.data;

                for (let i = 0; i < studentData.length; i++) {
                    delete studentData[i].password;
                }

                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "data": studentData
                });
            } else {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            }
        } else {
            let limitedFuzzyQueryItems = {
                firstName: query.firstName,
                lastName: query.lastName,
                email: query.email
            }

            let limitedAccurateQueryItems = {
                department: query.department,
                program: query.program
            }

            let safeFuzzyQueryItems = {};
            let safeAccurateQueryItems = {};


            for (let [key, value] of Object.entries(limitedFuzzyQueryItems)) {
                if (limitedFuzzyQueryItems[key] !== "" && limitedFuzzyQueryItems[key] !== undefined) {
                    safeFuzzyQueryItems[key] = value;
                }
            }

            for (let [key, value] of Object.entries(limitedAccurateQueryItems)) {
                if (limitedAccurateQueryItems[key] !== "" && limitedAccurateQueryItems[key] !== undefined) {
                    safeAccurateQueryItems[key] = value;
                }
            }

            let result = await lsh.read("students", safeAccurateQueryItems)
                .then((data) => {
                    return data
                })
                .catch((data) => {
                    return data
                });

            if (result.status === 200) {
                let optimisedResult = [];

                for (let i = 0; i < result.data.length; i++) {
                    for (let [key, value] of Object.entries(safeFuzzyQueryItems)) {
                        if (result.data[i][key].toLowerCase().includes(value.toLowerCase())) {
                            if (!optimisedResult.some(item => item.id === result.data[i].id)) {
                                optimisedResult.push(result.data[i]);
                            }
                        }
                    }
                }

                if (optimisedResult.length === 0 && Object.keys(safeFuzzyQueryItems).length === 0) {
                    optimisedResult = result.data;
                }

                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "data": optimisedResult
                });

            } else {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            }
        }
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default PostSearchStudentList