export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription, selectorUserAvatar }, api) {
    this._selectorProfileName = selectorProfileName;
    this._selectorProfileDescription = selectorProfileDescription;
    this._name = document.querySelector(selectorProfileName);
    this._about = document.querySelector(selectorProfileDescription);
    this._avatar = document.querySelector(selectorUserAvatar);
    this._api = api;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.alt = `${name}.`;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
