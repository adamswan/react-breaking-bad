import { request } from "../utils/request";


export function loginAPI(formData) {
    return request({
        url: "/authorizations",
        method: "post",
        data: formData
    });
}

export function getProfileAPI() {
    return request({
        url: "/user/profile",
        method: "get"
    });
}