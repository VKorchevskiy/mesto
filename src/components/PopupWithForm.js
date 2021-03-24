import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._buttonSave = this._popup.querySelector('.form__save')
    this._submitForm = submitForm.bind(this);
    this._inputList = this._form.querySelectorAll('.form__input-text');
    this._getInputValues = this._getInputValues.bind(this);
    this._submitFunction = this._submitFunction.bind(this);
  }

  open(data) {
    super.open();
    this.data = data;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    //console.log(this._formValues)
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitFunction);
  }

  _submitFunction() {
    this._submitForm(this._getInputValues());
  }

  close() {
    super.close();
    this._form.reset();
  }
}
