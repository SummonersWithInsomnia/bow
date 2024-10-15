const { lsh } = require("../lsh/lsh");

async function GetCourses(token, jsonObj) {
    let query = JSON.parse(jsonObj);
    if (Object.keys(query).length === 0) {
        return await lsh.read("courses", {"deleted": false});
    } else {
        let limitedNameAndCodeQueryItems = {
            name: query.name,
            code: query.code
        };

        let limitedOtherQueryItems = {
            id: query.id,
            department: query.department,
            program: query.program,
            term: query.term
        };

        let safeNameAndCodeQueryItems = {};
        let safeOtherQueryItems = {};

        for (let [key, value] of Object.entries(limitedNameAndCodeQueryItems)) {
            if (limitedNameAndCodeQueryItems[key] !== "" && limitedNameAndCodeQueryItems[key] !== undefined) {
                safeNameAndCodeQueryItems[key] = value;
            }
        }

        for (let [key, value] of Object.entries(limitedOtherQueryItems)) {
            if (limitedOtherQueryItems[key] !== "" && limitedOtherQueryItems[key] !== undefined) {
                safeOtherQueryItems[key] = value;
            }
        }

        safeOtherQueryItems.deleted = false;

        let result = await lsh.read("courses", safeOtherQueryItems)
            .then((data) => { return data;})
            .catch((data) => { return data; });


        if (result.status === 200) {
            let optimisedResult = [];

            for (let i = 0; i < result.data.length; i++) {
                for (let [key, value] of Object.entries(safeNameAndCodeQueryItems)) {
                    if (result.data[i][key].toLowerCase().includes(value.toLowerCase())) {
                        if (!optimisedResult.some(item => item.id === result.data[i].id)) {
                            optimisedResult.push(result.data[i]);
                        }
                    }
                }
            }

            if (optimisedResult.length === 0 && Object.keys(safeNameAndCodeQueryItems).length === 0) {
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
}

export default GetCourses