const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');

const popupTypeProfile = document.querySelector('.popup_type_profile');
const closePopupProfileButton = popupTypeProfile.querySelector('.popup__close');
const formProfile = popupTypeProfile.querySelector('.form_type_profile');
const profileNameInput = popupTypeProfile.querySelector('.form__input-text_type_name');
const profileDescriptionInput = popupTypeProfile.querySelector('.form__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupTypeCard = document.querySelector('.popup_type_card');
const closePopupCardButton = popupTypeCard.querySelector('.popup__close');
const formCard = popupTypeCard.querySelector('.form_type_card');
const cardNameInput = popupTypeCard.querySelector('.form__input-text_type_card-name');
const cardLinkInput = popupTypeCard.querySelector('.form__input-text_type_card-link');

const popupTypeImage = document.querySelector('.popup_type_img');
const closePopupImageButton = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input-text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input-text_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  const buttonElement = formElement.querySelector('.form__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__save_inactive');
  }
  else {
    buttonElement.classList.remove('form__save_inactive');
  }
}

enableValidation();

function createCard(el) {
  const card = cardTemplate.cloneNode(true);
  const imageButton = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = el.name;
  imageButton.setAttribute('src', el.link);
  imageButton.setAttribute('alt', el.name);
  return card;
}

function renderCard(card) {
  cardContainer.prepend(card);
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach(element => renderCard(createCard(element)));

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function openValidateForm(form) {
  const inputList = Array.from(form.querySelectorAll('.form__input-text'));
  const buttonElement = form.querySelector('.form__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => checkInputValidity(form, inputElement));
}

function handleInitProfilePopup() {
  formProfile.reset();
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openValidateForm(formProfile);
  openPopup(popupTypeProfile);
}

function handleProfileFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(popupTypeProfile);
}

function handleInitCardPopup() {
  formCard.reset();
  openValidateForm(formCard);
  openPopup(popupTypeCard);
}

function handleCardFormSubmit() {
  renderCard(createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));
  handleClosePopup(popupTypeCard);
}

function initImagePopup(event) {
  popupImage.setAttribute('src', event.target.src);
  popupImage.setAttribute('alt', event.target.alt);
  popupCaption.textContent = event.target.alt;
  openPopup(popupTypeImage);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_active');
}

function handleCloseOverlay(event) {
  if (event.target.classList.contains('popup')) {
    handleClosePopup(event.target);
  }
}

function handleCloseEscOverlay(event) {
  const popupActive = document.querySelector('.popup_active');
  if (event.key === 'Escape' && popupActive) {
    handleClosePopup(popupActive);
  }
}

function handleCardContainer(event) {
  if (event.target.classList.contains('card__like')) likeCard(event);
  if (event.target.classList.contains('card__trash')) deleteCard(event);
  if (event.target.classList.contains('card__image')) initImagePopup(event);
}

document.addEventListener('keydown', handleCloseEscOverlay);
document.addEventListener('click', handleCloseOverlay);
cardContainer.addEventListener('click', handleCardContainer);
editButton.addEventListener('click', handleInitProfilePopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
addButton.addEventListener('click', handleInitCardPopup);
formCard.addEventListener('submit', handleCardFormSubmit);
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));
