const { lsh } = require("../lsh/lsh");

async function PostLoginStudent(token, jsonObj) {
    let query = JSON.parse(jsonObj);

    if (query.hasOwnProperty("username") && query.hasOwnProperty("password")) {
        let result =
            await lsh.read("students", {
                "username": query.username.toLowerCase()
            }).then((data) => {
                return data;
            });

        if (result.data.length === 1 && result.data[0].password === query.password) {

            // TODO: Security
            // token here is not a real token
            // payload of token on real backend includes:
            // - user id
            // - user type
            // - token expiration timestamp

            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "userdata": {
                    type: result.data[0].type,
                    token: "student" + result.data[0].id
                }
            });
        } else {
            return Promise.reject({
                "status": 400,
                "message": "The Username or Password is Incorrect"
            });
        }
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default PostLoginStudent