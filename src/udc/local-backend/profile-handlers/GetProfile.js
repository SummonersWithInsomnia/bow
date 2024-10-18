import {lsh} from "../lsh/lsh";

async function GetProfile(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    if (userType === "students") {
        let uid = parseInt(token.substring(7));

        let result = await lsh.read("students", {id: uid})
            .then((data) => {
                return data;
            });
        if (result.status === 200 && result.data.length === 1) {
            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "userdata": {
                    id: result.data[0].id,
                    firstName: result.data[0].firstName,
                    lastName: result.data[0].lastName,
                    email: result.data[0].email,
                    phoneCountryCode: result.data[0].phoneCountryCode,
                    phoneNumber: result.data[0].phoneNumber,
                    birthday: result.data[0].birthday
                }
            });
        } else {
            return Promise.reject({
                "status": 400,
                "message": "Bad Request"
            });
        }
    } else if (userType === "admins") {
        let uid = parseInt(token.substring(5));
        let result = await lsh.read("admins", {id: uid})
            .then((data) => {
                return data;
            });
        if (result.status === 200 && result.data.length === 1) {
            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "userType": "admin",
                "userdata": {
                    id: result.data[0].id,
                    firstName: result.data[0].firstName,
                    lastName: result.data[0].lastName,
                    email: result.data[0].email,
                    phoneCountryCode: result.data[0].phoneCountryCode,
                    phoneNumber: result.data[0].phoneNumber,
                    birthday: result.data[0].birthday
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
}

export default GetProfile