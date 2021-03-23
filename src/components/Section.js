export default class Section {
  constructor({ renderer }, containerSelector, api) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  /**
   * Отрисовывает массив карточек
   * @param {Array} cards
   */
  renderItems(cards) {
    cards.forEach(card => this._renderer(card));
  }

  renderCardsFromServer() {
    this._api.getInitialCards()
      .then(data => {
        //console.log(data);
        this.renderItems(data);
      })
      .catch(err => console.log(err));
  }

  /**
   * Отрисовывает одну карточку
   * @param {Card} element карточка
   */
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }
}



/*
export default class Section {
  constructor({ cards, renderer }, containerSelector, api) {
    this._cards = cards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  renderItems() {
    this._cards.forEach(card => this._renderer(card));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
*/
