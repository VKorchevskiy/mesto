import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._buttonSave = this._popup.querySelector('.form__save')
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.form__input-text');
    this._getInputValues = this._getInputValues.bind(this);
    this._funcSubmit = this._funcSubmit.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._funcSubmit);

  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._funcSubmit);
  }

  _funcSubmit() {
    this._submitForm(this._getInputValues());
  }

  close() {
    super.close();
    this._removeEventListeners();
    this._form.reset();
  }
}