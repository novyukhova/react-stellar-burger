const baseUrl = "https://norma.nomoreparties.space";
const headers = {
  "Content-Type": "application/json",
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function getIngredients() {
  return fetch(`${baseUrl}/api/ingredients`)
    .then(checkResponse)
    .then((x) => x.data);
}

function createOrder(ingredients) {
  return fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then(checkResponse);
}

export { getIngredients, createOrder };
