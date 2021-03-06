import { selectorCloseButton } from '../utils/constant.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonClose = this._popup.querySelector(selectorCloseButton);
  }

  open() {
    this._popup.classList.add('popup_active');
  }

  close() {
    this._popup.classList.remove('popup_active');
    this.removeEventListeners();
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOverlayClose(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    document.addEventListener('keydown', () => this._handleEscClose());
    document.addEventListener('click', (event) => this._handleClickOverlayClose(event));
  }
/*  */
  removeEventListeners() {
    console.log(this)
    this._buttonClose.removeEventListener('click', () => this.close());
    document.removeEventListener('keydown', () => this._handleEscClose());
    document.removeEventListener('.click', (event) => this._handleClickOverlayClose(event));
  }
}
