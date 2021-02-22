const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (selectors) => {
  const formSelector = selectors.formSelector;
  const inputSelector = selectors.inputSelector;
  const submitButtonSelector = selectors.submitButtonSelector;
  const inactiveButtonClass = selectors.inactiveButtonClass;
  const inputErrorClass = selectors.inputErrorClass;
  const errorClass = selectors.errorClass;


  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function openValidateForm(formElement, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  const buttonElement = formElement.querySelector('.form__save');
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => checkInputValidity(formElement, inputElement, inputErrorClass, errorClass));
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
});
