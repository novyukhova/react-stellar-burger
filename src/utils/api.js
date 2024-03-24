import { getCookie, setCookie } from "./cookie";

const baseUrl = "https://norma.nomoreparties.space";
const headers = {
  "Content-Type": "application/json",
};
let accessToken = null;

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function requestWithToken(url, options) {
  if (!accessToken) {
    return refreshToken().then((res) => {
      return request(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: res.accessToken,
        },
      });
    });
  }

  return request(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken,
    },
  }).catch((err) => {
    if (err?.status === 401) {
      return refreshToken().then((res) => {
        return request(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: res.accessToken,
          },
        });
      });
    }
    return Promise.reject(err);
  });
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject({
    message: `Ошибка ${res.status}`,
    status: res.status,
  });
}

function setTokens(access, refresh) {
  setCookie("token", refresh);
  accessToken = access;
}

function getIngredients() {
  return request(`${baseUrl}/api/ingredients`).then((x) => x.data);
}

function createOrder(ingredients) {
  return requestWithToken(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
}

function sendResetEmail(email) {
  return request(`${baseUrl}/api/password-reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
    }),
  });
}

function resetPassword(password, token) {
  return request(`${baseUrl}/api/password-reset/reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
}

function login(email, password) {
  return request(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

function register(name, email, password) {
  return request(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
}

function logout() {
  return request(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  }).then((res) => {
    setCookie("token", "");
    accessToken = null;
    return res;
  });
}

function refreshToken() {
  return request(`${baseUrl}/api/auth/token`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  })
    .then((res) => {
      accessToken = res.accessToken;
      setCookie("token", res.refreshToken);
      return res;
    })
    .catch((err) => {
      if (err?.status === 401) {
        setCookie("token", "");
      }
      return Promise.reject(err);
    });
}

function loadUser() {
  return requestWithToken(`${baseUrl}/api/auth/user`, {
    method: "GET",
    headers: headers,
  });
}

function saveUser(user) {
  return requestWithToken(`${baseUrl}/api/auth/user`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(user),
  });
}

export {
  getIngredients,
  createOrder,
  sendResetEmail,
  resetPassword,
  login,
  register,
  logout,
  refreshToken,
  loadUser,
  saveUser,
  setTokens,
};
