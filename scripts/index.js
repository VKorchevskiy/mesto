import { initialCards } from './initial-сards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  popupTypeImage,
  popupImage,
  popupCaption,
  closePopupImageButton,
  editButton,
  addButton,
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
  selectorCloseButton,
  selectorPopupTypeImage,
  cardTemplate,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorProfileName,
  selectorProfileDescription,
}
  from '../utils/constant.js';
import { openPopup, handleClosePopup } from '../utils/utils.js';

const formProfileValidator = new FormValidator(formSelectors, formProfile);
const formCardValidator = new FormValidator(formSelectors, formCard);

const popupWithImage = new PopupWithImage(selectorPopupTypeImage);

const userInfo = new UserInfo({ selectorProfileName: selectorProfileName, selectorProfileDescription: selectorProfileDescription });

const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: () => {
    userInfo.setUserInfo({ userName: profileNameInput.value, userDescription: profileDescriptionInput.value })
    popupWithFormProfile._getInputValues();
    popupWithFormProfile.close();
  },
});

function handleInitProfilePopup() {
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.userName;
  profileDescriptionInput.value = profileInfo.userDescription;
  formProfileValidator.checkFormValidity();
  popupWithFormProfile.setEventListeners();
  popupWithFormProfile.open();
}

const cardsList = new Section({
  cards: initialCards,
  renderer: (initialCard) => {
    const card = new Card(initialCard, cardTemplate, {
      handleCardClick: () => {
        popupWithImage.setEventListeners();
        popupWithImage.open(initialCard);
      }
    });
    cardsList.addItem(card.generateCard());
  },
}, cardContainerSelector);

cardsList.renderItems();

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

const popupWithFormCard = new PopupWithForm(selectorPopupTypeCard, {
  submitForm: () => {
    const card = new Card(
      { name: cardNameInput.value, link: cardLinkInput.value },
      cardTemplate,
      {
        handleCardClick: () => {
          popupWithImage.setEventListeners();
          const cardInfo = card.getCardInfo();
          popupWithImage.open({ name: cardInfo.name, link: cardInfo.link });
        }
      }
    );
    cardsList.addItem(card.generateCard());
    popupWithFormCard._getInputValues();
    popupWithFormCard.close();
  },
});

function handleInitCardPopup() {
  formCardValidator.checkFormValidity();
  popupWithFormCard.setEventListeners();
  popupWithFormCard.open();
}

editButton.addEventListener('click', handleInitProfilePopup);
addButton.addEventListener('click', handleInitCardPopup);
