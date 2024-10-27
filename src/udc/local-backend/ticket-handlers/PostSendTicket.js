import {lsh} from "../lsh/lsh";

async function PostSendTicket(token, jsonObj) {
    let userType = token.match("student") ? "students" : token.match("admin") ? "admins" : "";
    let query = JSON.parse(jsonObj);

    if (userType === "students") {
        let uid = parseInt(token.substring(7));

        if (!query.hasOwnProperty("student") ||
            !query.hasOwnProperty("text") ||
            query.student !== uid ||
            query.text.length === 0
        ) {
            return Promise.reject({
                "status": 400,
                "message": "Bad Request"
            });
        } else {
            let result = await lsh.read("students", {id: uid})
                .then((data) => {
                    return data;
                });
            if (result.status === 200 && result.data.length === 1 && result.data[0].id === uid) {
                let now = new Date();
                now.setHours(now.getHours() - 6);

                let createTicketResult = await lsh.create("tickets", {
                    student: result.data[0].id,
                    createdDate: now.toISOString().substring(0, 10),
                    createdTime: now.toISOString().substring(11, 19),
                    text: query.text
                })

                if (createTicketResult.status === 200) {
                    return Promise.resolve({
                        "status": 200,
                        "message": "Ticket is Sent Successfully"
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
    } else {
        return Promise.reject({
            "status": 400,
            "message": "Bad Request"
        });
    }
}

export default PostSendTicket;