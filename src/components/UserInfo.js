export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription, selectorUserAvatar }) {
    this._selectorProfileName = selectorProfileName;
    this._selectorProfileDescription = selectorProfileDescription;
    this._name = document.querySelector(selectorProfileName);
    this._about = document.querySelector(selectorProfileDescription);
    this._avatar = document.querySelector(selectorUserAvatar);
  }

  /**
   * Возвращает объект данных пользователя
   * @returns объект данных пользователя
   */
  getUserInfo() {
    return this._user;
  }

  /**
   * Возвращает id пользователя
   * @returns id пользователя
   */
  getUserId() {
    return this._user._id;
  }

  /**
   * Устанавливает значения параметрам пользователя
   * @param {*} user - объект данных пользователя
   */
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._avatar.alt = `${user.name}.`;
    this._user = user;
  }

  /**
   * смена аватара в DOM дереве
   * @param {*} param0 avatar - ссылка на аватар
   */
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

}
