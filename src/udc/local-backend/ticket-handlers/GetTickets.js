import {lsh} from "../lsh/lsh";

async function GetTickets(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    if (userType === "admins") {
        let uid = parseInt(token.substring(5));
        let result = await lsh.read("admins", { id: uid })
            .then((data) => { return data; });
        if (result.status === 200 && result.data.length === 1) {
            let ticketResult = await lsh.read("tickets", {})
                .then((data) => { return data; })
                .catch((data) => { return data; });
            if (ticketResult.status === 200) {
                let ticketData = ticketResult.data;
                let studentResult = await lsh.read("students", {})
                    .then((data) => { return data; })
                    .catch((data) => { return data; });
                if (studentResult.status === 200) {
                    let studentData = studentResult.data;
                    for (let i = 0; i < ticketData.length; i++) {
                        for (let j = 0; j < studentData.length; j++) {
                            if (ticketData[i].student === studentData[j].id) {
                                ticketData[i].firstName = studentData[j].firstName;
                                ticketData[i].lastName = studentData[j].lastName;
                                ticketData[i].email = studentData[j].email;
                            }
                        }
                    }
                    return Promise.resolve({
                        "status": 200,
                        "message": "OK",
                        "data": ticketData
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
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default GetTickets;