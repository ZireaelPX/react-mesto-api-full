class Api {
	constructor({ baseUrl, headers }) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	}

	// Методы работы с API
	getUserInfo() {
		const url = this.baseUrl + '/users/me';
		return fetch(url, { headers: this.headers, })
			.then(this._checkResponse);
	}
	getInitialCards() {
		const url = this.baseUrl + '/cards';
		return fetch(url, { headers: this.headers, })
			.then(this._checkResponse);
	}

	//получение карточек и информации о пользователе
	getData() {
		return Promise.all([this.getInitialCards(), this.getUserInfo()]);
	}

	updateUserInfo(body) {
		const url = this.baseUrl + '/users/me';
		return fetch(url, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: body.name,
				about: body.about
			})
		})
			.then(this._checkResponse);
	}

	updateUserAvatar(body) {
		const url = this.baseUrl + '/users/me/avatar';
		return fetch(url, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: body.avatar
			})
		})
			.then(this._checkResponse);
	}
	addNewCard(body) {
		const url = this.baseUrl + '/cards';
		return fetch(url, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: body.title,
				link: body.link
			})
		})
			.then(this._checkResponse);
	}
	deleteCard(cardId) {
		const url = this.baseUrl + `/cards/${cardId}`;
		return fetch(url, {
			method: 'DELETE',
			headers: this.headers,
		})
			.then(this._checkResponse);
	}

	addCardLike(cardId) {
		const url = this.baseUrl + `/cards/${cardId}/likes`;
		return fetch(url, {
			method: 'PUT',
			headers: this.headers,
		})
			.then(this._checkResponse);
	}
	deleteCardLike(cardId) {
		const url = this.baseUrl + `/cards/${cardId}/likes`;
		return fetch(url, {
			method: 'DELETE',
			headers: this.headers,
		})
			.then(this._checkResponse);
	}
}

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
	headers: {
		authorization: 'f9c3f6ea-f7e6-4b11-b471-468214b553cb',
		'Content-Type': 'application/json'
	}
});

export default api;
