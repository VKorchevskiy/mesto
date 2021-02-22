import { initialCards } from './initial-сards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

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

export const popupTypeImage = document.querySelector('.popup_type_img');
export const popupImage = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption');
export const closePopupImageButton = document.querySelector('.popup_type_img').querySelector('.popup__close');


function renderCard(card) {
  cardContainer.prepend(card);
}


initialCards.forEach(cardData => {
  const card = new Card(cardData, '#card');
  renderCard(card.generateCard());
})

export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', handleCloseEscOverlay);
  document.addEventListener('click', handleCloseOverlay);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', handleCloseEscOverlay);
  document.removeEventListener('.click', handleCloseOverlay);
}

function handleCloseOverlay(event) {
  if (event.target.classList.contains('popup')) {
    handleClosePopup(event.target);
  }
}

function handleCloseEscOverlay() {
  const popupActive = document.querySelector('.popup_active');
  if (event.key === 'Escape') {
    handleClosePopup(popupActive);
  }
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
  //openValidateForm(formProfile);
  openPopup(popupTypeProfile);
}

function handleProfileFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(popupTypeProfile);
}

function handleInitCardPopup() {
  formCard.reset();
  //openValidateForm(formCard);
  openPopup(popupTypeCard);
}

function handleCardFormSubmit() {
  renderCard(createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));
  handleClosePopup(popupTypeCard);
}





/* function handleCardContainer(event) {
  if (event.target.classList.contains('card__like')) likeCard(event);
  if (event.target.classList.contains('card__trash')) deleteCard(event);
  if (event.target.classList.contains('card__image')) initImagePopup(event);
} */


//cardContainer.addEventListener('click', handleCardContainer);
editButton.addEventListener('click', handleInitProfilePopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
addButton.addEventListener('click', handleInitCardPopup);
formCard.addEventListener('submit', handleCardFormSubmit);
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));

