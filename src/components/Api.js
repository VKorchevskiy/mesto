import { optionsApi } from '../utils/constant.js';

export default class Api {
  constructor(config) {
    this._urlUserMe = config.urlUserMe;
    this._urlCards = config.urlCards;
    this._headers = config.headers;
  }

/**
 * Взятие данных пользователя с сервера
 * @returns
 */
  getUserInfo() {
    return fetch(this._urlUserMe, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

  /**
   * Взятие массива карточек с сервера, для первичной инициализации страницы
   * @returns {Array}
   */
  getInitialCards() {
    return fetch(this._urlCards, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
  }




}


/* fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
  headers: {
    'Content-Type': 'application/json',
    authorization: '69f5d24a-9d82-4482-8712-0c3c63467f5c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */
