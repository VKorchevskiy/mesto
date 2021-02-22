export class FormValidator {
  _inputSelector;
  _submitButtonSelector;
  _inactiveButtonClass;
  _inputErrorClass;
  _errorClass;
  _formElement;

  constructor(selectors, formElement) {
    /* formSelector: '.form',
    inputSelector: '.form__input-text',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_inactive',
    inputErrorClass: 'form__input-text_type_error',
    errorClass: 'form__input-error_active' */

    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (/* formElement, */inputElement, errorMessage/*, inputErrorClass, errorClass */) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (/* formElement, */inputElement/*, inputErrorClass, errorClass */) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = (/* formElement,*/ inputElement/*, inputErrorClass, errorClass */) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(/* formElement, */inputElement, inputElement.validationMessage/*, inputErrorClass, errorClass */);
    } else {
      this._hideInputError(/* formElement, */inputElement/*, inputErrorClass, errorClass */);
    }
  };

  _setEventListeners = (/* formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass */) => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(/* inputList, buttonElement, inactiveButtonClass */);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(/* formElement,*/ inputElement/*, inputErrorClass, errorClass */);
        this._toggleButtonState(/* inputList, buttonElement, inactiveButtonClass */);
      });
    });
  };

  _hasInvalidInput(/* inputList */) {
    return this._inputList.some((_inputElement) => !_inputElement.validity.valid);
  }

  _toggleButtonState(/* inputList, buttonElement, inactiveButtonClass */) {
    if (this._hasInvalidInput(/* inputList */)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(/* this._formElement, this._inputSelector, this._submitButtonSelector, this._inputErrorClass, this._errorClass, this._inactiveButtonClass */);
  };

  openValidateForm(/* formElement, inactiveButtonClass, inputErrorClass, errorClass, inputSelector, submitButtonSelector */) {
    this._inputList.forEach((inputElement) => this._checkInputValidity(/* formElement, */inputElement/*, inputErrorClass, errorClass */));
    this._toggleButtonState(/* inputList, buttonElement, inactiveButtonClass */);
  }

}
