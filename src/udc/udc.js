// Unified Data Connection

import {UDC_SOURCE} from "./udc.config";
import {lb} from "./local-backend/lb";

export class udc {
    constructor() {
        throw new Error("Cannot instantiate udc class");
    }

    static async get(path, token) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.get(path, token);
        } else {
            return await fetch(UDC_SOURCE.endpoint + path, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                return error;
            });
        }
    }

    static async post(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.post(path, token, JSON.stringify(obj));
        } else {
            return await fetch(UDC_SOURCE.endpoint + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                return error;
            });
        }
    }

    static async put(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.put(path, token, JSON.stringify(obj));
        } else {
            return await fetch(UDC_SOURCE.endpoint + path, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                return error;
            });
        }
    }

    static async delete(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.delete(path, token, JSON.stringify(obj));
        } else {
            return await fetch(UDC_SOURCE.endpoint + path, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                return error;
            });
        }
    }

    static async patch(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.patch(path, token, JSON.stringify(obj));
        } else {
            return await fetch(UDC_SOURCE.endpoint + path, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                return error;
            });
        }
    }

}