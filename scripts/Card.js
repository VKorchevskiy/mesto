import { openPopup, popupTypeImage, popupImage, popupCaption } from './index.js';

export class Card {
  _cardTemplate
  _name
  _alt
  _link
  constructor(cardData, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = cardData.name;
    this._alt = cardData.name;
    this._link = cardData.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);

    this._setEventListeners();

    return this._element;
  }

  _handleLikeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteCard() {
    this._element.closest('.card').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.card__image').addEventListener('click', () => this._initImagePopup());
  }

  _initImagePopup() {
    popupImage.setAttribute('src', this._link);
    popupImage.setAttribute('alt', this._name);
    popupCaption.textContent = this._name;
    openPopup(popupTypeImage);
  }
}
