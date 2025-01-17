import { request } from "../utils/request";


export function getChannelsAPI() {
    return request({
        url: "/channels",
        method: "get",
    });
}

export function createArticleAPI(data) {
    return request({
        url: "/mp/articles?draft=false",
        method: "post",
        data
    });
}

