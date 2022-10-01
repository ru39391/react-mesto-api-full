import React from 'react';
import { apiUrl } from './constants';

class Api extends React.Component {
  constructor(baseUrl) {
    super();
    this._baseUrl = baseUrl;
  }

  _checkResponse(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  _setHeaders(jwt) {
    return {
      'Authorization' : `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._setHeaders(jwt)
    })
      .then((res) => {return this._checkResponse(res, 'Ошибка при загрузке карточек')});
  }

  addCard(data, jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._setHeaders(jwt),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка при добавление новой карточки'));
  }

  removeCard(data, jwt) {
    return fetch(`${this._baseUrl}/cards/${data.id}`, {
      method: 'DELETE',
      headers: this._setHeaders(jwt),
    })
      .then(res => this._checkResponse(res, 'Ошибка при удалении карточки'));
  }

  changeLikeCardStatus(data, jwt) {
    const config = {
      method: data.isLiked ? 'PUT' : 'DELETE',
      alert: data.isLiked ? 'Ошибка при добавлении в избранное' : 'Ошибка при удалении из избранного',
    }
    return fetch(`${this._baseUrl}/cards/${data.id}/likes`, {
      method: config.method,
      headers: this._setHeaders(jwt),
    })
      .then(res => this._checkResponse(res, config.alert));
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._setHeaders(jwt)
    })
      .then(res => this._checkResponse(res, 'Ошибка при получении данных пользователя'));
  }

  setUserData(data, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._setHeaders(jwt),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка при обновлении данных пользователя'));
  }

  setUserPic(data, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._setHeaders(jwt),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка при обновлении изображения пользователя'));
  }
}

const api = new Api(apiUrl);

export default api;