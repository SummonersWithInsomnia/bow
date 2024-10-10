import {lsh} from "../lsh/lsh";
import data from "bootstrap/js/src/dom/data";

async function PatchProfile(token, jsonObj) {
    let query = JSON.parse(jsonObj);
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";

    if (query.hasOwnProperty("firstName") &&
        query.hasOwnProperty("lastName") &&
        query.hasOwnProperty("email") &&
        query.hasOwnProperty("phoneCountryCode") &&
        query.hasOwnProperty("phoneNumber") &&
        query.hasOwnProperty("birthday")
    ) {
        if (userType === "students") {
            let uid = parseInt(token.substring(7));
            let result = await lsh.read("students", {id: uid})
                .then((data) => {
                    return data;
                });

            if (result.status === 200 && result.data.length === 1) {
                query.id = uid;
                let updateResult = await lsh.update("students", query)
                    .then((data) => {
                        return data
                    });
                if (updateResult.status === 200) {
                    return Promise.resolve({
                        "status": 200,
                        "message": "Profile Updated"
                    });
                }
            }
        } else if (userType === "admins") {
            let uid = parseInt(token.substring(5));
            let result = await lsh.read("admins", {id: uid})
                .then((data) => {
                    return data;
                });

            if (result.status === 200 && result.data.length === 1) {
                query.id = uid;
                let updateResult = await lsh.update("admins", query)
                    .then((data) => {
                        return data
                    });
                if (updateResult.status === 200) {
                    return Promise.resolve({
                        "status": 200,
                        "message": "Profile Updated"
                    });
                }
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

export default PatchProfile