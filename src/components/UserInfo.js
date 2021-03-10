export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription }) {
    this._selectorProfileName = selectorProfileName;
    this._selectorProfileDescription = selectorProfileDescription;
    this._userName = document.querySelector(selectorProfileName);
    this._userDescription = document.querySelector(selectorProfileDescription);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    }
  }

  setUserInfo({ userName, userDescription }) {
    this._userName.textContent = userName;
    this._userDescription.textContent = userDescription;
  }
}
