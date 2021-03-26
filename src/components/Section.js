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
   * Отрисовывает одну карточку в начале секции
   * @param {Card} element карточка
   */
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  /**
   * Отрисовывает одну карточку в конце секции
   * @param {*} element
   */
  addItemAppend(element) {
    this._container.append(element);
  }
}
