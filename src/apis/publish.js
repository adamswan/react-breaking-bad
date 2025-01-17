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
    data,
  });
}

export function getArticleByIdAPI(id) {
    return request({
        url: "/mp/articles/" + id ,
        method: "get",
    });
}

export function upgradeArticleAPI(data, id) {
    return request({
      url: `/mp/articles/${id}?draft=false`,
      method: "put",
      data,
    });
  }