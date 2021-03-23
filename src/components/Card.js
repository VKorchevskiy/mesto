export default class Card {
  constructor(card, cardTemplate, { handleCardClick }, api) {
    this._cardTemplate = cardTemplate;
    this._name = card.name;
    this._alt = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likesCount = this._element.querySelector('.card__like-count')
    this._image = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    //console.log(this._likesCount);
    //console.log(this._likes.length);
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }

  getCardInfo() {
    return { name: this._name, link: this._link };
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
    this._image.addEventListener('click', this._handleCardClick);
  }
}
