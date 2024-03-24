import { getCookie, setCookie } from "./cookie";

const baseUrl = "https://norma.nomoreparties.space";
const headers = {
  "Content-Type": "application/json",
};
let accessToken: string | null = null;

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, options).then(checkResponse<T>);
}

function requestWithToken<T>(url: string, options: RequestInit): Promise<T> {
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

  return request<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken,
    },
  }).catch((err) => {
    if (err?.status === 401) {
      return refreshToken().then((res) => {
        return request<T>(url, {
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

function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject({
    message: `Ошибка ${res.status}`,
    status: res.status,
  });
}

function setTokens(access: string, refresh: string) {
  setCookie("token", refresh);
  accessToken = access;
}

function getAccessToken(): Promise<string> {
  if (accessToken) {
    return Promise.resolve(accessToken);
  }
  return refreshToken().then((res) => res.accessToken);
}

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

type TIngredientsResponse = {
  data: TIngredient[];
} & TApiResponse;

function getIngredients(): Promise<TIngredient[]> {
  return request<TIngredientsResponse>(`${baseUrl}/api/ingredients`).then(
    (x) => x.data
  );
}

type TOrder = {
  ingredients: TIngredient[];
  _id: string;
  owner?: TUser;
  status: string;
  name: string;
  number: number;
  price: number;
};

type TOrderResponse = {
  order: TOrder;
  name: string;
} & TApiResponse;

function createOrder(ingredients: string[]): Promise<TOrderResponse> {
  return requestWithToken(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
}

function sendResetEmail(email: string): Promise<TApiResponse> {
  return request(`${baseUrl}/api/password-reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
    }),
  });
}

function resetPassword(password: string, token: string): Promise<TApiResponse> {
  return request(`${baseUrl}/api/password-reset/reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
}

function login(email: string, password: string): Promise<TLoginResponse> {
  return request(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

type TLoginResponse = TTokenResponse & TUserResponse;

type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
} & TApiResponse;

function register(
  name: string,
  email: string,
  password: string
): Promise<TLoginResponse> {
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

function logout(): Promise<TApiResponse> {
  return request<TApiResponse>(`${baseUrl}/api/auth/logout`, {
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

type TApiResponse = {
  success: boolean;
  message?: string;
};

function refreshToken(): Promise<TTokenResponse> {
  return request<TTokenResponse>(`${baseUrl}/api/auth/token`, {
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

type TUser = { name: string; email: string };

type TUserResponse = { user: TUser } & TApiResponse;

function loadUser(): Promise<TUserResponse> {
  return requestWithToken(`${baseUrl}/api/auth/user`, {
    method: "GET",
    headers: headers,
  });
}

function saveUser(user: TUser): Promise<TUserResponse> {
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
  getAccessToken,
};
export type { TIngredient, TUser, TOrder };
