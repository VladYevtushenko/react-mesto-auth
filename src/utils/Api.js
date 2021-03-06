class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    editProfile(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
        .then(this._getResponseData)
    }

    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink.avatar
            })
        })
        .then(this._getResponseData)
    }

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getResponseData)
    }

    changeLikeCardStatus(id, setLike) {
        if(setLike) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._getResponseData);
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._getResponseData);
        }
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`????????????: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '9cc98c8c-c941-4afd-80ce-342069e7a748',
        'Content-Type': 'application/json'
    }
});

export default api;