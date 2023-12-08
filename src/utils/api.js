const baseUrl = "https://norma.nomoreparties.space";

function getIngredients() {
    return fetch(`${baseUrl}/api/ingredients`)
    .then((response) => response.json())
    .then((x) => x.success ? x.data : Promise.reject(new Error('Could not get ingredients')))
    .catch(() => Promise.reject(new Error('Could not get ingredients')));
}

export {getIngredients};