export default class Section {
  constructor({cards, renderer}, containerSelector) {
    this._cards = cards;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._cards.forEach(card => this._renderer(card));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

