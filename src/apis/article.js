import { request } from "../utils/request";


export function getArticleListAPI(data) {
    return request({
        url: "/mp/articles",
        method: "get",
        params: data
    });
}

export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: "delete"
    });
}



