// Local Storage Helpers

import {DATASETS} from "./datasets.config";

export class lsh {
    constructor() {
        throw new Error("Cannot instantiate lsh class");
    }

    static initAllDatasets() {
        DATASETS.forEach((dataset) => {
            lsh.init(dataset);
        });
    }

    static init(dataset) {
        if (!lsh.exist(dataset.name)) {
            localStorage.setItem(dataset.name, JSON.stringify(dataset.data));
        }
    }

    static exist(datasetName) {
        return localStorage.getItem(datasetName) !== null;
    }

    static async create(datasetName, queryObj) {
        if (this.exist(datasetName)) {
            let dataset = JSON.parse(localStorage.getItem(datasetName));
            let newObj = queryObj;
            newObj.id = dataset.length;
            dataset.push(queryObj);
            localStorage.setItem(datasetName, JSON.stringify(dataset));
            return Promise.resolve({
                "status": 200,
                "message": "OK",
                "data": newObj
            });
        } else {
            return Promise.reject({
                "status": 500,
                "message": "Internal Server Error"
            });
        }
    }

    static async read(datasetName, queryObj) {
        if (this.exist(datasetName)) {
            if (Object.keys(queryObj).length === 0) {
                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "data": JSON.parse(localStorage.getItem(datasetName))
                });
            } else {
                // const dataset = JSON.parse(localStorage.getItem(datasetName));
                // let resultData = [];
                // let vaildQuery = {};
                // for (let [key, value] of Object.entries(queryObj)) {
                //     if (queryObj[key] !== "") {
                //         vaildQuery[key] = value;
                //     }
                // }
                // for (let i = 0; i < dataset.length; i++) {
                //     for (let [key, value] of Object.entries(vaildQuery)) {
                //         if (dataset[i][key] === value) {
                //             if (!resultData.some(item => item.id === dataset[i].id)) {
                //                 resultData.push(dataset[i]);
                //             }
                //         }
                //     }
                // }

                const dataset = JSON.parse(localStorage.getItem(datasetName));
                const validQuery = Object.fromEntries(
                    Object.entries(queryObj).filter(([_, value]) => value !== "")
                );

                const resultData = dataset.filter(item =>
                    Object.entries(validQuery).every(([key, value]) => item[key] === value)
                );

                return Promise.resolve({
                    "status": 200,
                    "message": "OK",
                    "data": resultData
                });
            }
        } else {
            return Promise.reject({
                "status": 500,
                "message": "Internal Server Error"
            });
        }
    }

    static async update(datasetName, queryObj) {
        if (this.exist(datasetName)) {
            if (Object.keys(queryObj).length === 0) {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            } else {
                let dataset = JSON.parse(localStorage.getItem(datasetName));
                for (let i = 0; i < dataset.length; i++) {
                    if (dataset[i].id === queryObj.id) {
                        for (let [key, value] of Object.entries(queryObj)) {
                            dataset[i][key] = value;
                        }
                        localStorage.setItem(datasetName, JSON.stringify(dataset));
                        return Promise.resolve({
                            "status": 200,
                            "message": "OK"
                        });
                    }
                }
                return Promise.reject({
                    "status": 500,
                    "message": "Internal Server Error"
                });
            }
        } else {
            return Promise.reject({
                "status": 500,
                "message": "Internal Server Error"
            });
        }
    }

    static async delete(datasetName, queryObj) {
        if (this.exist(datasetName)) {
            if (Object.keys(queryObj).length === 0) {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            } else {
                let dataset = JSON.parse(localStorage.getItem(datasetName));
                for (let i = 0; i < dataset.length; i++) {
                    if (dataset[i].id === queryObj.id) {
                        dataset[i].deleted = true;
                        localStorage.setItem(datasetName, JSON.stringify(dataset));
                        return Promise.resolve({
                            "status": 200,
                            "message": "Object Deleted"
                        });
                    }
                }
                return Promise.reject({
                    "status": 500,
                    "message": "Internal Server Error"
                });
            }
        } else {
            return Promise.reject({
                "status": 500,
                "message": "Internal Server Error"
            });
        }
    }

    static async deleteMultiple(datasetName, queryObj) {
        if (this.exist(datasetName)) {
            if (Object.keys(queryObj).length === 0) {
                return Promise.reject({
                    "status": 400,
                    "message": "Bad Request"
                });
            } else {
                let dataset = JSON.parse(localStorage.getItem(datasetName));
                for (let i = 0; i < dataset.length; i++) {
                    if (dataset[i][queryObj.fk] === queryObj.fkValue) {
                        dataset[i].deleted = true;
                    }
                }
                localStorage.setItem(datasetName, JSON.stringify(dataset));
                return Promise.resolve({
                    "status": 200,
                    "message": "Objects Deleted"
                });
            }
        } else {
            return Promise.reject({
                "status": 500,
                "message": "Internal Server Error"
            });
        }
    }
}