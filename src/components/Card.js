export default class Card {
  constructor(card, cardTemplate, { handleCardClick }, { handelDeleteIcon }, { handleLikeIcon }, userId) {
    this._userId = userId;
    this._card = card;
    this._cardTemplate = cardTemplate;
    this._name = card.name;
    this._alt = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._handleCardClick = handleCardClick;
    this._handelDeleteIcon = handelDeleteIcon;
    this._handleLikeIcon = handleLikeIcon;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._trash = this._element.querySelector('.card__trash');
    if (this._card.owner._id !== this._userId) {
      this._trash.classList.add('card__trash_disabled');
    }
    this._image = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    this._setEventListeners();
    return this._element;
  }

  setLikeCount(el) {
    this._likesCount = el.querySelector('.card__like-count');
    this._likesCount.textContent = this._likes.length;
    return el;
  }

  incrementLikeCount() {
    this._likesCount.textContent = (0 || +this._likesCount.textContent) + 1;
  }

  decrementLikeCount() {
    this._likesCount.textContent = (0 || +this._likesCount.textContent) - 1;
  }

  renderMyLike(el) {
    if(this.isLiked()) {
      this.renderToogleLikeCard();
    }
    return el
  }

  getCardInfo() {
    return { name: this._name, link: this._link, id: this._id };
  }

  getId() {
    return this._id;
  }

  isLiked() {
    this._isLiked = this._likes.some(like => like._id == this._userId);
    return this._isLiked;
  }

  toggleIsLiked() {
    this._isLiked = !this._isLiked;
    return this._isLiked;
  }

  renderToogleLikeCard() {
    this._like.classList.toggle('card__like_active');
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.card__like');
    this._like.addEventListener('click', () => this._handleLikeIcon(this));
    //this._like.addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.card__trash').addEventListener('click', () => this._handelDeleteIcon(this));
    //this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteCard());
    this._image.addEventListener('click', this._handleCardClick);
  }
}
