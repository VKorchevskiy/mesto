import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(initialCard) {
    this._image.setAttribute('src', initialCard.link);
    this._image.setAttribute('alt', initialCard.name);
    this._caption.textContent = initialCard.name;
    super.open();
  }
}
