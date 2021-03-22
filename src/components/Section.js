export default class Section {
  constructor({ renderer }, containerSelector, api) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api
  }

  /**
   * Отрисовывает массив карточек
   * @param {Array} cards
   */
 renderItems(cards) {
    cards.forEach(card => this._renderer(card));
  }

  /**
   * Отрисовывает одну карточку
   * @param {Card} element карточка
   */
addItem(element) {
    this._container.prepend(element);
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
