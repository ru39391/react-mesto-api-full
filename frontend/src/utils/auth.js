import React from 'react';
import { apiUrl } from './constants';

class Auth extends React.Component {
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

  _setHeaders(jwt = null) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if(jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    };
    return headers;
  }

  authUser(data, config) {
    return fetch(`${this._baseUrl}/${config.endPoint}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then(res => this._checkResponse(res, config.errorAlert));
  }

  getUserToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._setHeaders(jwt),
    })
      .then(res => this._checkResponse(res, 'Ошибка при получении JSON Web Token'));
  }
}

const auth = new Auth(apiUrl);

export default auth;