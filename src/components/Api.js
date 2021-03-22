export default class Api {
  constructor(config) {
    this._urlUserMe = config.urlUserMe;
    this._urlCards = config.urlCards;
    this._headers = config.headers;
  }

/**
 * Взятие данных пользователя с сервера
 * @returns {*} Данные пользователя
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
   * @returns {Array} массив карточек
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

  /**
   * Обновление информации пользователя
   * @param {*} param0 name - имя пользователя, about - описание пользователя.
   */
  setUserInfo({name, about}) {
    return fetch(this._urlUserMe, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
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
 * Добавление карточки
 * @param {*} param0 name - название карточки, link - ссылка на картинку.
 */
  setCard({name, link}) {
    return fetch(this._urlCards, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
    .catch(err => Promise.reject(err));
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
