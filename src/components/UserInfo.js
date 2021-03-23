export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription, selectorUserAvatar }, api) {
    this._selectorProfileName = selectorProfileName;
    this._selectorProfileDescription = selectorProfileDescription;
    this._name = document.querySelector(selectorProfileName);
    this._about = document.querySelector(selectorProfileDescription);
    this._avatar = document.querySelector(selectorUserAvatar);
    this._api = api;
  }

  getUserInfoOnServer() {
    return this._api.getUserInfo()
    .then(user => {
      //console.log(data);
      this._user = user;
      this.setUserInfo(user);
      this.setUserAvatar(user);
    })
    .catch(err => {
      console.log(err)
    });
  }

  getUserInfo() {
    return this._user;
  }

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
