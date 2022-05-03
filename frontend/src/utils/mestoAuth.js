const BASE_URL = "https://api.artempavlov.mesto.nomoredomains.work";

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

export function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

export function getToken(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

