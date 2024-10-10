import { lsh } from "../lsh/lsh";

async function PostSignupStudent(token, jsonObj) {
    let query = JSON.parse(jsonObj);

    if (query.hasOwnProperty("username") &&
        query.hasOwnProperty("password") &&
        query.hasOwnProperty("firstName") &&
        query.hasOwnProperty("lastName") &&
        query.hasOwnProperty("email") &&
        query.hasOwnProperty("phoneCountryCode") &&
        query.hasOwnProperty("phoneNumber") &&
        query.hasOwnProperty("birthday") &&
        query.hasOwnProperty("department") &&
        query.hasOwnProperty("program")
    ) {
        let existUser = await lsh.read("students", { "username": query.username.toLowerCase()})
            .then((data) => { return data });

        if (existUser.data.length === 0) {
            let newUser = {
                type: "student",
                username: query.username,
                password: query.password,
                firstName: query.firstName,
                lastName: query.lastName,
                email: query.email,
                phoneCountryCode: query.phoneCountryCode,
                phoneNumber: query.phoneNumber,
                birthday: query.birthday,
                department: query.department,
                program: query.program
            }

            let result = await lsh.create("students", newUser)
                .then((data) => { return data });

            if (result.status === 200) {
                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "userdata": {
                        type: result.data.type,
                        token: "student" + result.data.id
                    }
                });
            } else {
                return Promise.reject({
                    "status": 500,
                    "message": "Internal Server Error"
                });
            }
        } else {
            return Promise.reject({
                "status": 400,
                "message": "The username is already used."
            });
        }

    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default PostSignupStudent