import { initialCards } from './initial-сards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { popupTypeImage, closePopupImageButton } from '../utils/constant.js';
import { openPopup, handleClosePopup } from '../utils/utils.js';

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
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

const formSelectors = {
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
}

const formProfileValidator = new FormValidator(formSelectors, formProfile);
const formCardValidator = new FormValidator(formSelectors, formCard);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

function renderCard(card) {
  cardContainer.prepend(card);
}

function createCard(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate);
  renderCard(card.generateCard());
}

initialCards.forEach(cardData => createCard(cardData, '#card'));

function handleInitProfilePopup() {
  formProfile.reset();
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formProfileValidator.checkFormValidity();
  openPopup(popupTypeProfile);
}

function handleProfileFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(popupTypeProfile);
}

function handleInitCardPopup() {
  formCard.reset();
  formCardValidator.checkFormValidity();
  openPopup(popupTypeCard);
}

function handleCardFormSubmit() {
  createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }, '#card');
  handleClosePopup(popupTypeCard);
}

editButton.addEventListener('click', handleInitProfilePopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
addButton.addEventListener('click', handleInitCardPopup);
formCard.addEventListener('submit', handleCardFormSubmit);
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));

