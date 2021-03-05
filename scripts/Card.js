import { popupTypeImage, popupImage, popupCaption } from '../utils/constant.js';
import { openPopup } from '../utils/utils.js';

export default class Card {
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
    this._like.classList.toggle('card__like_active');
  }

  _handleDeleteCard() {
    this._element.closest('.card').remove();
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.card__like');
    this._like.addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteCard());
    this._image.addEventListener('click', () => this._initImagePopup());
  }

  _initImagePopup() {
    popupImage.setAttribute('src', this._link);
    popupImage.setAttribute('alt', this._name);
    popupCaption.textContent = this._name;
    openPopup(popupTypeImage);
  }
}
