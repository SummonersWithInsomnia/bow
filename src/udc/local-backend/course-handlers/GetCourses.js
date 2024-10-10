const { lsh } = require("../lsh/lsh");

async function GetCourses(token, jsonObj) {
    return await lsh.read("courses", {});
}

export default GetCourses