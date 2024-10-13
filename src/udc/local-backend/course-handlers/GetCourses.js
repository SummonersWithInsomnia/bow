const { lsh } = require("../lsh/lsh");

async function GetCourses(token, jsonObj) {
    return await lsh.read("courses", {"deleted": false});
}

export default GetCourses