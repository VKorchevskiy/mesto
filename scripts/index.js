import { initialCards } from './initial-сards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Card from './Card.js';
import {
  popupTypeImage,
  closePopupImageButton,
  editButton, addButton,
  cardContainerSelector,
  popupTypeProfile,
  closePopupProfileButton,
  formProfile,
  profileNameInput,
  profileDescriptionInput,
  profileName,
  profileDescription,
  popupTypeCard,
  closePopupCardButton,
  formCard,
  cardNameInput,
  cardLinkInput,
  formSelectors,
  cardTemplate
}
  from '../utils/constant.js';
import { openPopup, handleClosePopup } from '../utils/utils.js';

const formProfileValidator = new FormValidator(formSelectors, formProfile);
const formCardValidator = new FormValidator(formSelectors, formCard);

const cardsList = new Section(
  {
    cards: initialCards,
    renderer: (initialCard) => {
      const card = new Card(initialCard, cardTemplate);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardContainerSelector
);

cardsList.renderItems();

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

/* function renderCard(card) {
  cardContainer.prepend(card);
}

function createCard(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate);
  renderCard(card.generateCard());
}

initialCards.forEach(cardData => createCard(cardData, '#card')); */

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

