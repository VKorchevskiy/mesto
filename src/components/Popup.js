export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayClose = this._handleClickOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickOverlayClose);
  }

  _handleEscClose(event) {
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
    this._buttonClose.addEventListener('click', this.close);
  }
}
