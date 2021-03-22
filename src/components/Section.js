export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
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
