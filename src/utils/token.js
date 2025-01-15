const TOKENKEY = "token_key";

export function setToken(token) {
  localStorage.setItem(TOKENKEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKENKEY);
}

export function removeToken() {
  localStorage.removeItem(TOKENKEY);
}
