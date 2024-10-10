// Unified Data Connection

import { UDC_SOURCE } from "./udc.config";
import { lb } from "./local-backend/lb";

export class udc {
    constructor() {
        throw new Error("Cannot instantiate udc class.");
    }

    static async get(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.get(path, token, JSON.stringify(obj));
        }
    }

    static async post(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.post(path, token, JSON.stringify(obj));
        }
    }

    static async put(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.put(path, token, JSON.stringify(obj));
        }
    }

    static async delete(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.delete(path, token, JSON.stringify(obj));
        }
    }

    static async patch(path, token, obj) {
        if (UDC_SOURCE.type === "LocalBackend") {
            return await lb.patch(path, token, JSON.stringify(obj));
        }
    }

}