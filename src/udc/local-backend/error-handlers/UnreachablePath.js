async function UnreachablePath() {
    return Promise.reject({
        "status": 404,
        "message": "Not Found"
    });
}

export default UnreachablePath